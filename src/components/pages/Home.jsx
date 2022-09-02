import { Link } from "react-router-dom";

export function Home() {
    return (      
        <div>
             <div class="bg-dark py-5">
                <div class="container px-5">
                    <div class="row gx-5 align-items-center justify-content-center">
                        <div class="col-lg-8 col-xl-7 col-xxl-6">
                            <div class="my-5 text-center text-xl-start">
                                <h1 class="display-5 fw-bolder text-white mb-2">Pon a prueba tus capacidades</h1>
                                <p class="lead fw-normal text-white-50 mb-4">Pruebas creadas para medir tus destrezas y prepararte para tus pruebas de manejo</p>
                                <div class="d-grid gap-3 d-sm-flex justify-content-sm-center justify-content-xl-start">
                                    <Link class="btn btn-primary btn-lg px-4 me-sm-3" to="/game">Empezar</Link>
                                </div>
                            </div>
                        </div>
                        <div class="col-xl-5 col-xxl-6 d-none d-xl-block text-center"><img class="img-fluid rounded-3 my-5" src={`/assets/images/drive_test.jpg`} alt="..." /></div>
                    </div>
                </div>
            </div>
        <section class="py-5" id="features">
                <div class="container px-5 my-5">
                    <div class="row gx-5">
                        <div class="col-lg-4 mb-5 mb-lg-0"><h2 class="fw-bolder mb-0">Lorem ipsum dolor sit amet</h2></div>
                        <div class="col-lg-8">
                            <div class="row gx-5 row-cols-1 row-cols-md-2">
                                <div class="col mb-5 h-100">
                                    <div class="feature bg-primary bg-gradient text-white rounded-3 mb-3"><i class="bi bi-collection"></i></div>
                                    <h2 class="h5">Lorem ipsum dolor sit amet</h2>
                                    <p class="mb-0">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Pharetra sit amet aliquam id diam maecenas ultricies mi. Tristique senectus et netus et malesuada fames ac turpis egestas.</p>
                                </div>
                                <div class="col mb-5 h-100">
                                    <div class="feature bg-primary bg-gradient text-white rounded-3 mb-3"><i class="bi bi-building"></i></div>
                                    <h2 class="h5">Lorem ipsum dolor sit amet</h2>
                                    <p class="mb-0">Non blandit massa enim nec dui nunc mattis enim ut. Tristique magna sit amet purus gravida. Consequat mauris nunc congue nisi vitae suscipit tellus.</p>
                                </div>
                                <div class="col mb-5 mb-md-0 h-100">
                                    <div class="feature bg-primary bg-gradient text-white rounded-3 mb-3"><i class="bi bi-toggles2"></i></div>
                                    <h2 class="h5">Lorem ipsum dolor sit amet</h2>
                                    <p class="mb-0">Neque gravida in fermentum et. Purus in mollis nunc sed id semper risus in. Praesent tristique magna sit amet purus gravida quis blandit.</p>
                                </div>
                                <div class="col h-100">
                                    <div class="feature bg-primary bg-gradient text-white rounded-3 mb-3"><i class="bi bi-toggles2"></i></div>
                                    <h2 class="h5">Lorem ipsum dolor sit amet</h2>
                                    <p class="mb-0">Purus in massa tempor nec feugiat nisl pretium fusce id. Elit at imperdiet dui accumsan sit amet. Pharetra magna ac placerat vestibulum lectus mauris ultrices.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            </div>
    );
}