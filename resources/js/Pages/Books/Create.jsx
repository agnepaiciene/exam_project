import {useForm} from "@inertiajs/react";
import AppLayout from "@/Layouts/AppLayout";

export default function Create({books, categories, auth, props}) {
    const {data, setData, post, errors, progress}=useForm({

        name:"",
        description:null,
        ISBN:null,
        image:null,
        pages:0,
        category_id:0,
    });

    const handleChange=(event)=>{
        setData({
            ...data,
            [event.target.id]:event.target.value
        });
    };

    const handleSubmit=(event)=>{
        event.preventDefault();
        post(route("books.store"));
    }
    const categoriesList=[];
    categoriesList.push(<option key={0} value="">-</option>);
    categories.forEach((category)=>{
        categoriesList.push(<option key={category.id} value={category.id}>{category.name}</option>)
    });


    return (
        <AppLayout>
            <div className={"col-md-12 mt-5"}>
                <div className={"card"}>
                    <div className={"card-header"}>Puslapis</div>
                    <div className={"card-body"}>
                        <form onSubmit={handleSubmit}>
                            <div className={"mb-3"}>
                                <label className={"form-label"}>Kategorija:</label>
                                {/*<input type={"text"} className={"form-control "} id={"country_id"} onChange={handleChange}/>*/}
                                <select id="category_id" className="form-select" onChange={handleChange} value={data.category_id}>
                                    {categoriesList}
                                </select>
                            </div>
                            <div className={"mb-3"}>
                                <label className={"form-label"}>Pavadinimas:</label>
                                <input type={"text"} className={"form-control"} id={"name"} onChange={handleChange} value={data.name} />

                            </div>
                            <div className={"mb-3"}>
                                <label className={"form-label"}>Aprasymas</label>
                                <input type={"text"} className={"form-control "} id={"description"} onChange={handleChange} value={data.description} />

                            </div>
                            <div className={"mb-3"}>
                                <label className={"form-label"}>ISBN</label>
                                <input type={"text"} className={"form-control "} id={"ISBN"} onChange={handleChange} value={data.ISBN} />

                            </div>
                            <div className={"mb-3"}>
                                <label className={"form-label"}>Puslapiai</label>
                                <input type={"text"} className={"form-control "} id={"pages"} onChange={handleChange} value={data.pages} />

                            </div>

                            {/** paveiksliuko įkėlimas*/}


                            <div className="mb-3">
                                <label className="form-label">Paveiksliukas</label>
                                <input className="form-control" type="file" id="image"  onChange={(event)=>{
                                    setData({
                                        ...data,
                                        image: event.target.files[0]
                                    });
                                }} />
                            </div>

                            {/**Progress baras*/}

                            <div className="mb-3">
                                {progress && (
                                    <progress value={progress.percentage} max="100">
                                        {progress.percentage}%
                                    </progress>
                                )}
                            </div>
                            <div className="mb-3">
                                {progress && <span>{progress.percentage} % </span> }
                            </div>

                            <button type={"submit"} className={"btn btn-success"}>Pridėti</button>
                        </form>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
