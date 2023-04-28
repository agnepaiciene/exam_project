import {useForm} from "@inertiajs/react";
import AppLayout from "@/Layouts/AppLayout";

export default function Edit({category}) {
    const {data, setData,put, post, errors}=useForm(category);

    const handleChange=(event)=>{
        setData({
            ...data,
            [event.target.id]:event.target.value
        });
    };

    const handleSubmit=(event)=>{
        event.preventDefault();
        put(route("categories.update", category.id));

    }

    return (
        <AppLayout>
            <div className={"col-md-12 mt-5"}>
                <div className={"card"}>
                    <div className={"card-header"}>Puslapis</div>
                    <div className={"card-body"}>
                        <form onSubmit={handleSubmit}>
                            <div className={"mb-3"}>
                                <label className={"form-label"}>Kategorija</label>
                                <input type={"text"} className={"form-control "} id={"name"} onChange={handleChange} value={data.name}/>

                            </div>
                           <button type={"submit"} className={"btn btn-success"}>Pridėti</button>
                        </form>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
