import { useState, useEffect, useRef } from "react";
import { db } from "../firebase/config";
import { collection, onSnapshot, query, where, orderBy } from "firebase/firestore";


export const useCollection = (c, _q, _orderBy) => {
    const [documents, setDocuments] = useState(null)
    const [error, setError] = useState(null)

    // set up query
    const q = useRef(_q).current
    const order = useRef(_orderBy).current


    useEffect(() => {
        let ref = collection(db, c)


        if (q) {
            ref = query(ref, where(...q),)
        }

        if (order) {
            ref = query(ref, where(...q), orderBy(...order))
        }

        const unsub = onSnapshot(ref, (snapshot) => {
            let results = []
            snapshot.docs.forEach(doc => {
                results.push({ ...doc.data(), id: doc.id })
            })
            setDocuments(results)
            console.log(results)
            setError(null)
        }, error => {
            console.log(error)
            setError('Could not fetch the data')
        })

        // unsub on unmount
        return () => unsub()

    }, [c, q, order])

    return { documents, error }
}
