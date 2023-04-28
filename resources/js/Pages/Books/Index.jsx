import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, Link, router} from '@inertiajs/react';
import AppLayout from "@/Layouts/AppLayout";
import Button from "bootstrap/js/src/button";
import {useState} from "react";

export default function Index(props) {
    const editCategories=props.auth.user!=null && props.auth.user.type===1;


    const [filter,setFilter]=useState({

        name:props.filter.name,
        // description:props.filter.description,
        // ISBN:props.filter.ISBN,
        category_id:props.filter.category_id,
    });

    const handleChange=(event)=>{
        setFilter({
            ...filter,
            [event.target.id]:event.target.value,
        });
    }

    const handleFilter=()=>{
        router.post( route("books.filter"), filter);
        console.log(filter);
    }

    const order=props.order;


    const categoriesList=[];
    categoriesList.push(<option key="0" value="">-</option>)

    props.categories.forEach((category) => {
        categoriesList.push(<option key={category.id} value={category.id}>{category.name}</option> );

    });



    const booksList=[];
    props.books.forEach((book)=>{
       booksList.push(
            <tr key={book.id}>
                <td>
                    {book.name}
                </td>
                <td>
                    {book.description}
                </td>

                <td>
                    {book.ISBN}
                </td>
                <td>
                    {book.pages}
                </td>



                <td>
                    {book.image && <img width="80px" src={"/storage/books/" +book.image} alt={"image"}></img>}

                </td>
                <td>
                    {book.category.name}
                </td>

                <td>
                    {/*{ (auth.user!=null && auth.user.type===1)?*/}
                    <div>
                        {editCategories && <Link className="btn btn-warning "  href={ route("books.edit",book.id)} >Redaguoti</Link> }&nbsp;
                        {editCategories && <button className="btn btn-danger "  onClick={ ()=>{ router.delete(route("books.destroy",book.id));  }}  >Ištrinti</button>} &nbsp;
                        {/*<Link className={"btn btn-success"} href={route("books.addOrders",book.id)}>Užsakyti</Link>*/}

                    </div>
                    {/*//     :*/}
                    {/*//     <div>*/}
                    {/*//         <Link className="btn btn-warning "  href={ route("books.edit",book.id)} >Redaguoti</Link> &nbsp;*/}
                    {/*//         <button className="btn btn-danger "  onClick={ ()=>{ router.delete(route("books.destroy",book.id)); } }  >Ištrinti</button> &nbsp;*/}
                    {/*//         /!*<Link className={"btn btn-success"} href={route("books.addOrders",book.id)}>Užsakyti</Link>*!/*/}
                    {/*//     </div>*/}
                    {/*// }*/}
                </td>
            </tr>
       )
    });
    return (
        <AppLayout>
            <div className={"col-md-12 mt-5"}>
                <div className={"card"}>
                    <div className={"card-header"}>Puslapis</div>
                    <div className={"card-body"}>
                        <Link className="btn btn-primary "  href={ route("books.create")} >Pridėti</Link>
                        <table className={"table"}>
                            <thead>
                            <tr>

                                <th>
                                    {/*<span onClick={ ()=>{setOrder({field:"name", dir:1} )} }>*/}
                                    <Link href={route("books.order", ["name", order.field==="name" && order.dir==="ASC"?"DESC":"ASC" ] )}>Pavadinimas</Link>
                                    {/*</span>*/}
                                </th>
                                <th>
                                    {/*<Link href={route("books.order", ["description", order.field==="description" && order.dir==="ASC"?"DESC":"ASC" ] )}>Aprašymas</Link>*/}
                                    Aprašymas
                                </th>
                                <th>
                                    {/*<Link href={route("books.order", ["ISBN", order.field==="ISBN" && order.dir==="ASC"?"DESC":"ASC" ] )}>ISBN</Link>*/}
                                    ISBN
                                </th>
                                <th>
                                    {/*<Link href={route("books.order", ["pages", order.field==="pages" && order.dir==="ASC"?"DESC":"ASC" ] )}>Puslapių skaičius</Link>*/}
                                    Puslapių skaičius

                                </th>
                                <th>Paveiksliukas</th>
                                <th>
                                    <Link href={route("books.order", ["category_id", order.field==="category_id" && order.dir==="ASC"?"DESC":"ASC" ] )}>Kategorija</Link>
                                </th>
                                <th>Veiksmai</th>
                                <th>
                                    <button  className="btn btn-success" onClick={handleFilter}>Filtruoti</button>
                                </th>
                            </tr>
                            <tr>
                                <th>
                                    <input id="name" type="text" className="form-control" value={filter.name} onChange={handleChange} />
                                </th>
                                <th></th>
                                <th></th>
                                <th></th>
                                <th></th>
                                {/*<th>*/}
                                {/*    <input id="description" type="text" className="form-control" value={filter.description} onChange={handleChange} />*/}
                                {/*</th>*/}
                                {/*<th>*/}
                                {/*    <input id="ISBN" type="text" className="form-control" value={filter.ISBN} onChange={handleChange} />*/}
                                {/*</th>*/}
                                {/*<th>*/}
                                {/*    <input id="pages" type="text" className="form-control" value={filter.pages} onChange={handleChange} />*/}
                                {/*</th>*/}
                                <th>
                                    <select id="category_id" className="form-select"  value={filter.category_id} onChange={handleChange}>
                                        {categoriesList}
                                    </select>
                                </th>
                            </tr>
                            </thead>
                            <tbody>
                            {booksList}

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
