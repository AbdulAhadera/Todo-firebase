import { useEffect, useState } from 'react';
import { collection, addDoc, query, where, doc, getDocs } from "firebase/firestore";
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
    const addTask = async () => {
        if (newTask.trim() !== '') {

            try {
                const docRef = await addDoc(collection(db, "todo"), {
                    title: newTask,
                    userId: auth.currentUser.uid,
                });
                console.log("Document written with ID: ", docRef.id);

            } catch (e) {
                console.error("Error adding document: ", e);
            }
            setTasks([...tasks, newTask]);
            setNewTask('');
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
                    console.log(uid)
                } else {
                    console.log('user is not logged in');
                }
            });
        }
        authChange()

    }, [])



    const removeTask = (index) => {
        const updatedTasks = [...tasks];
        updatedTasks.splice(index, 1);
        setTasks(updatedTasks);
        
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
                    </li>
                ))}
            </ul>
            <button onClick={signOutUser}>Fuck</button>
        </div>
    );
};

export default TodoApp;
