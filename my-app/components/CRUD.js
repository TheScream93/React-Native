import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Button, TextInput, View } from 'react-native';
import { database } from '../firebaseConfig';
import { collection, addDoc, onSnapshot, doc, deleteDoc, setDoc } from "firebase/firestore";
import { useState, useEffect } from "react"

export default function Crud() {

    const [input, setInput] = useState('');
    const [users, setUsers] = useState([]);
    const [tempUser, setTempUser] = useState('');

    writeUser = async (name) => {
        await addDoc(collection(database, "users"), {
            userName: name
        });
        setInput('')
    }

    useEffect(() => {
        const ref = collection(database, 'users');
        const unsubscribe = onSnapshot(ref, (snapshot) => {
                    let arr = []
                    snapshot.docs.forEach(doc => {
                        arr.push({
                            id: doc.id,
                            ...doc.data()
                        })
                    })
                    setUsers(arr)
        })
        return () => unsubscribe()
    }, [])

    deleteUser = async (userId) => {
        await deleteDoc(doc(database, "users", userId));
    }

    updateUser = async (userId, name) => {
        await setDoc(doc(database, "users", userId), {
            userName: name
        });
    }


    return (
        <View style={styles.container}>
            <View>
                <TextInput
                    onChangeText={user => setInput(user)}
                    style={styles.input}
                    value={input}
                />
            </View>

            <View style={{ padding: 10, flex: 0 }}>
                <View style={styles.button}>
                    <View style={{ marginRight: 5 }}>
                        <Button title='Write User' onPress={() => writeUser(input)} />
                    </View>
                </View>
            </View>

            <View>
                {
                    users.map((user, index) => {
                        return (
                            <View key={index} style={{ flexDirection: 'row', justifyContent: 'space-between', margin: 10 }}>
                                <TextInput style={{width: 100, borderWidth: 1}} onChangeText={(text) => {
                                    setTempUser(text)
                                }}>{user.userName}</TextInput>
                                <View style={{flexDirection: 'row'}}>
                                    <View style={{marginRight: 5}}>
                                        <Button title='Update' onPress={() => updateUser(user.id, tempUser)} />
                                    </View>
                                    <View style={{marginRight: 5}}>
                                        <Button title='Delete' onPress={() => deleteUser(user.id)} />
                                    </View>
                                </View>
                            </View>
                        )
                    })
                }
            </View>


            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 25,
        backgroundColor: '#fff',
    },
    input: {
        margin: 12,
        width: 'auto',
        borderWidth: 1,
        padding: 10,
    },
    button: {
        width: 120,
        marginLeft: 12,
        margin: 'auto',
        flexDirection: 'row'
    }
});
