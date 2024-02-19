import Header from "../ui/header/Header";

export default function internalLayout({ children }){
    return <>
    <Header/>
    {children}
    </>
}