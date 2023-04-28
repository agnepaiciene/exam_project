import 'bootstrap/dist/css/bootstrap.css';
import {Link, usePage} from "@inertiajs/react";
import NavLink from "@/Components/NavLink";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import ApplicationLogo from "@/Components/ApplicationLogo";
import Dropdown from "@/Components/Dropdown";



export default function AppLayout({children}) {
    const {auth}=usePage().props;
    const user=auth.user;
    // console.log(user);
    return (


        <div className="container">
            <div className="row">
                <nav className="navbar navbar-expand-lg bg-body-tertiary">
                    <div className="container-fluid">



                        <a className="navbar-brand fw-bold" href="#">Sistema</a>



                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                                data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false"
                                aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>

                        <div className="collapse navbar-collapse" id="navbarNav" style={{display: "block" }}>
                            {user!=null?
                                <ul className="navbar-nav ">
                                    <li className="nav-item">
                                        <Link href={ route("categories.index")} className="nav-link">Knygų kategorijų sąrašas</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link href={ route("books.index")} className="nav-link">Knygų sąrašas</Link>
                                    </li>

                                    {/*<li className="nav-item">*/}
                                    {/*    <Link href={ route("hotels.addOrders")} className="nav-link">Užsakymai</Link>*/}
                                    {/*</li>*/}
                                </ul>

                                :
                                <ul className="navbar-nav ">
                                    <li className="nav-item">
                                        {/*<Link href={ route("categories.index")} className="nav-link">Knygų kategorijų sąrašas</Link>*/}
                                    </li>
                                    <li className="nav-item">
                                        {/*<Link href={ route("books.index")} className="nav-link">Knygų sąrašas</Link>*/}
                                    </li>
                                    {/*<li className="nav-item">*/}
                                    {/*    <Link href={ route("hotels.addOrders")} className="nav-link">Užsakymai</Link>*/}
                                    {/*</li>*/}
                                </ul>

                            }
                        </div>
                        {user==null ?
                            <div className="float-end">

                                <Link className="btn btn-primary mr-3 "  href={ route("login")} >Prisijungti</Link>
                                &nbsp;


                                <Link className="btn btn-info "  href={ route("register")} >Registruotis</Link>

                            </div>
                            :
                            <div className="float-end">
                                <span >Jūs esate prisijungęs kaip: <b>{user.name} ({user.type===1?"administratorius":"vartotojas"})</b> </span>
                                <Link className="btn btn-warning " href={route('logout')} method="post" >Atsijungti</Link>

                            </div>
                        }

                        {/*<div className="float-end">*/}
                        {/*    <Link href={route('setLanguage', 'lt')}>LT</Link>*/}
                        {/*    &nbsp;*/}
                        {/*    <Link href={route('setLanguage', 'en')}>EN</Link>*/}
                        {/*</div>*/}
                    </div>
                </nav>
                {children}
            </div>
        </div>


    );
}
