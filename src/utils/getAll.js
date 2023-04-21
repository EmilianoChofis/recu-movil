import {child, get, getDatabase, ref, set} from "firebase/database";

const dbRef = ref(getDatabase());
export async function getAll() {
    try {
        let numId = 1;
        get(child(dbRef, `contactos/`)).then((snapshot) => {
            if (snapshot.exists()) {
                const data = snapshot.val();
                console.log(data);
            } else {
                console.log("No data available");
            }
        }).catch((error) => {
            console.error(error);
        });
    }catch (e) {
        console.log(e);
    }
}