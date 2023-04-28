import AppLayout from "@/Layouts/AppLayout";
import {Link, router} from "@inertiajs/react";
import {useState} from "react";

export default function Index(props){
     const categoriesList=[];
    const editCategories=props.auth.user!=null && props.auth.user.type===1;


    const [filter,setFilter]=useState({

        name:props.filter.name,

    });
    const handleChange=(event)=>{
        setFilter({
            ...filter,
            [event.target.id]:event.target.value,
        });
    }
    const handleFilter=()=>{
        router.post( route("categories.filter"), filter);
        console.log(filter);
    }

    const handleDelete=(event)=>{
        router.delete( route("categories.destroy", event.target.value) );
    }

    const order=props.order;

    // let categories=props.categories;
    // categories.sort(
    //     (a, b)=>{
    //         if (a[order.field]>b[order.field]){
    //             return 1*order.dir;
    //         }
    //         if (a[order.field]<b[order.field]){
    //             return -1*order.dir;
    //         }
    //         return 0
    //     }
    // );


    props.categories.forEach((category)=>{
        categoriesList.push(
            <tr key={category.id}>
                <td>{ category.name}</td>

                <td className="text-center">

                    {editCategories && <Link className="btn btn-primary" href={ route('categories.edit', category.id)}>Redaguoti</Link> }
                </td>
                <td className="text-center">
                    {editCategories  && <button className="btn btn-danger" onClick={handleDelete} value={category.id}>Ištrinti</button> }
                </td>
            </tr>
        )
    });



    return (
        <AppLayout>
            <div className="col-md-12 mt-5">
                <div className="card">
                    <div className="card-header">Kategorijos </div>
                    <div className="card-body">
                        <Link className="btn btn-success float-end" href={ route("categories.create") }>Pridėti naują </Link>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>
                                        <Link href={route("categories.order", ["name", order.field==="name" && order.dir==="ASC"?"DESC":"ASC" ] )}>Kategorija</Link>
                                        <input id="name" type="text" className="form-control" value={filter.name} onChange={handleChange} />
                                    </th>

                                    <th colSpan="2" className="text-center">Veiksmai</th>

                                    <tr>
                                        {/*<input id="name" type="text" className="form-control" value={filter.name} onChange={handleChange} />*/}
                                    </tr>

                                    <th>
                                        <button  className="btn btn-success" onClick={handleFilter}>Filtruoti</button>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                { categoriesList }
                            </tbody>
                        </table>


                    </div>


                </div>
            </div>
        </AppLayout>
    )
}
