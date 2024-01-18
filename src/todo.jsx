import { useEffect, useState } from 'react';
import { collection, addDoc, query, where, deleteDoc, getDocs, doc, updateDoc } from "firebase/firestore";
import { db, auth } from './Config';
import { onAuthStateChanged, signOut } from "firebase/auth";

const TodoApp = () => {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState('');


    function signOutUser() {
        signOut(auth).then(() => {
            console.log('Sign - out successful.');
        }).catch((error) => {
            console.log(error);
        });
    }
    const addTask = async (uid) => {
        if (uid) {
            if (newTask.trim() !== '') {
                try {
                    const docRef = await addDoc(collection(db, "todo"), {
                        title: newTask,
                        userId: auth.currentUser.uid,
                    });
                    console.log("Document written with ID: ", docRef.id);
                    setTasks([...tasks, newTask]);
                    setNewTask('');

                } catch (e) {
                    console.error("Error adding document: ", e);
                }
            }
        } else {
            console.log('make sure u are logged in');
        }

    };

    const renderData = async (uid) => {
        const q = query(collection(db, "todo"), where("userId", "==", uid));
        const querySnapshot = await getDocs(q);
        setTasks(querySnapshot.docs.map(doc => doc.data().title));
        console.log('Data has been rendered -------->', auth.currentUser.uid)
    }

    useEffect(() => {
        const authChange = () => {
            onAuthStateChanged(auth, (user) => {
                if (user) {
                    const uid = user.uid;
                    renderData(uid)
                    addTask(uid)
                } else {
                    console.log('user is not logged in');
                }
            });
        }
        authChange()

    }, [])

    const removeTask = async (index) => {

        console.log("Delete function running")
        const querySnapshot = await getDocs(collection(db, "todo"));
        querySnapshot?.forEach(async (docs) => {
            if (docs.data().title === tasks[index]) {
                await deleteDoc(doc(db, "todo", docs.id));
                const updatedTasks = [...tasks];
                updatedTasks.splice(index, 1);
                setTasks(updatedTasks)
            }
        })
    };

    const updateTask = async (index) => {
        console.log("Update function running");

        // Get the document reference for the task at the specified index
        const taskDocRef = await getDocs(collection(db, "todo"));
        const taskDocs = taskDocRef.docs;
        const targetDoc = taskDocs[index];

        if (targetDoc) {
            console.log("Document ID:", targetDoc.id);

            // Prompt the user for the new title
            const newTitle = prompt("Enter the new title:");

            // Check if the user entered a new title
            if (newTitle !== null) {
                // Update the document in Firestore
                await updateDoc(doc(db, "todo", targetDoc.id), {
                    title: newTitle,
                });

                // Update the local state or perform any other necessary tasks
                const updatedTasks = [...tasks];
                updatedTasks[index] = newTitle;
                setTasks(updatedTasks);

                console.log("Task updated successfully");
            } else {
                console.log("User canceled the operation");
            }
        } else {
            console.log("Task not found");
        }
    };




    return (
        <div>
            <h1>Todo App</h1>
            <div>
                <input
                    type="text"
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                />
                <button onClick={addTask}>Add Task</button>
            </div>
            <ul>
                {tasks.map((task, index) => (
                    <li key={index}>
                        {task}
                        <button onClick={() => removeTask(index)}>Remove</button>
                        <button onClick={() => updateTask(index)}>Edit</button>
                    </li>
                ))}
            </ul>
            <button onClick={signOutUser}>Log out</button>
        </div>
    );
};

export default TodoApp;
