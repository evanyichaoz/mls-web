'use client'
import { User, UserCredential, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import React, { useContext, useState, useEffect } from "react"
import { auth, db } from "../../firebase";
import { DocumentData, doc, setDoc, getDoc } from "firebase/firestore";

export type AuthContent = {
    currentUser: User | null,
    userData: DocumentData | null,
    signup: (email: string, password: string) => Promise<UserCredential>,
    login: (email: string, password: string) => Promise<UserCredential>,
    logout: () => Promise<void>,
    updateUserName: (user: User, firstName: string, lastName: string) => Promise<void>,
    loading: boolean,
}

class FirebaseAuthError extends Error {
    code: string;
    constructor(message: string, code: string) {
        super(message); // Pass the message to the base Error constructor
        this.code = code;
        this.name = "FirebaseAuthError"; // Set the name of the error
    }
}

const AuthContext = React.createContext<AuthContent>({
    currentUser: null,
    userData: null,
    signup: function (email: string, password: string): Promise<UserCredential> {
        throw new Error("Function not implemented.");
    },
    login: function (email: string, password: string): Promise<UserCredential> {
        throw new Error("Function not implemented.");
    },
    logout: function (): Promise<void> {
        throw new Error("Function not implemented.");
    },
    updateUserName: function (): Promise<void> {
        throw new Error("Function not implemented.");
    },
    loading: false
});

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }: Readonly<{ children: React.ReactNode; }>) {
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [userData, setUserData] = useState<DocumentData | null>(null);
    const [loading, setLoading] = useState(true);

    const signup = async (email: string, password: string) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            return userCredential; // Return the full UserCredential object
        } catch (error: any) {
            const errorCode = error.code;
            const errorMessage = error.message;

            // Handle different error codes
            switch (errorCode) {
                case "auth/invalid-email":
                    throw new FirebaseAuthError("Invalid email address", errorCode);
                case "auth/email-already-in-use":
                    throw new FirebaseAuthError("This email is already in use. Please use a different email address", errorCode);
                case "auth/weak-password":
                    throw new FirebaseAuthError("Password is too weak. Please choose a stronger password", errorCode);
                case "auth/network-request-failed":
                    throw new FirebaseAuthError("Network request failed. Please check your internet connection", errorCode);
                case "auth/missing-email":
                    throw new FirebaseAuthError("Email is required. Please provide a valid email address", errorCode);
                case "auth/operation-not-allowed":
                    throw new FirebaseAuthError("Email/password accounts are not enabled. Please contact the admin", errorCode);
                default:
                    throw new FirebaseAuthError("Signup failed. Please try again later", errorCode);
            }
        }
    }

    const login = async (email: string, password: string) => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            return userCredential;
        } catch (error: any) {
            const errorCode = error.code;
            console.log(error)

            // Handle different error codes and throw custom errors with code and message
            switch (errorCode) {
                case "auth/invalid-credential":
                    throw new FirebaseAuthError("Incorrect emial or password. Please try again", errorCode);
                case "auth/invalid-email":
                    throw new FirebaseAuthError("Invalid email address", errorCode);
                case "auth/user-disabled":
                    throw new FirebaseAuthError("This user has been disabled", errorCode);
                case "auth/user-not-found":
                    throw new FirebaseAuthError("No user found with this email. Please check the email address", errorCode);
                case "auth/wrong-password":
                    throw new FirebaseAuthError("Incorrect password. Please try again", errorCode);
                case "auth/too-many-requests":
                    throw new FirebaseAuthError("Too many attempts. Please try again later", errorCode);
                case "auth/network-request-failed":
                    throw new FirebaseAuthError("Network request failed. Please check your internet connection", errorCode);
                default:
                    throw new FirebaseAuthError("Login failed. Please try again later", errorCode);
            }
        }
    }

    const logout = () => {
        setUserData(null);
        setCurrentUser(null);
        return signOut(auth);
    }

    const updateUserName = async (user: User, firstName: string, lastName: string) => {
        const newData = { firstName, lastName }; // 使用传入的 firstName 和 lastName
        const docRef = doc(db, 'users', user.uid);
        return await setDoc(docRef, newData, { merge: true });
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async user => {
            try {
                setLoading(true);
                setCurrentUser(user);
                if (!user) {
                    return;
                }

                const docRef = doc(db, 'users', user.uid);
                const docSnap = await getDoc(docRef);
                let firebaseData = {};
                if (docSnap.exists()) {
                    console.log("Document data:", docSnap.data());
                    firebaseData = docSnap.data();
                }
                setUserData(firebaseData);
            } catch (err: any) {
                console.log(err.message);
            } finally {
                setLoading(false);
            }
        })
        return unsubscribe;
    }, [])

    const value = {
        currentUser,
        userData,
        signup,
        login,
        logout,
        loading,
        updateUserName
    }

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    )
}
