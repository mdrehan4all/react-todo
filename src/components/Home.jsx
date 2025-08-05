import { useEffect, useState } from "react"

export default function Home(){

    const [title, setTitle] = useState('');
    const [list, setList] = useState([]);

    const createNew = () =>{
        console.log("Create new "+title);
        const newItem = {
            id: Date.now(),
            title: title,
            message: '',
            cdatetime: ''
        }
        setList((prevItem)=>[...prevItem, newItem]);
        setTitle('');
    }

    const removeItem = (id) => {
        // const index = list.findIndex(obj => obj.id === id);
        if(!confirm('Are you sure')){
            return;
        }
        const updatedItems = list.filter(item => item.id !== id);
        setList(updatedItems);
    }

    const editMessage = (id, message) => {
       setList(prevItems =>
            prevItems.map(item =>
                item.id === id ? { ...item, message: message } : item
            )
        );
    }
    const editTitle = (id, ntitle) => {
       setList(prevItems =>
            prevItems.map(item =>
                item.id === id ? { ...item, title: ntitle } : item
            )
        );
    }

    useEffect(() => {
        const ls = localStorage.getItem('list');
        if(ls){
            const data = JSON.parse(ls);
            if(data.length >= 1){
                setList(data);
            }
        }
    }, []);

    useEffect(() => {
        console.log(list)
        localStorage.setItem('list', JSON.stringify([...list]));
    }, [list]);

    return(
        <>
            <div className="container">
                <div className="row">
                    <div className="col-md-12 mt-2">
                        <input type="text" placeholder="Create new" className="form-control" value={title} onChange={(e)=>setTitle(e.target.value)} onKeyDown={(e)=>{if(e.key === 'Enter'){ createNew() }}}/>
                    </div>
                    
                    {
                        list.sort((a, b) => b.id - a.id).map((item, index)=>(
                             <div className="col-md-12 mt-2 border rounded-4 p-4" key={index}>
                                <h1><input value={item.title} onChange={(e)=>{ editTitle(item.id, e.target.value) }} style={{border: 'none'}}/></h1>
                                <textarea className="form-control my-2" onChange={(e)=>{ editMessage(item.id, e.target.value) }}>{item.message}</textarea>
                                <button className="btn btn-sm btn-danger" onClick={()=>{removeItem(item.id)}}>Delete</button>
                            </div>
                        ))
                    }
                </div>
            </div>
        </>
    )
}