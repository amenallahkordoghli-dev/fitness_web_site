import "./../styles/home.css";
import { QRCodeCanvas } from "qrcode.react";

function Stat({ contity, nom }) {
    const n = nom.split(" ")
    return (
        <div>
            <p className="number">{contity + "K+"}</p>
            <p className="nom">{n[0]}</p>
            <p>{n[1]}</p>
        </div>
    )
}
function Info() {


    return (
        <div className="info">
            <p>Welcome  to life fitness. We're here to help you  become best and
                strongest by guiding you on your fitness trip.</p>
        </div>
    );
}
function Icon() {
    return (
        <div class="stat-bubble">
            <img src="https://res.cloudinary.com/dtdnbgbrp/image/upload/v1776876659/png_4_pzvipf.png"
            ></img>
        </div>
    );
}
export default function Home() {
    const url = window.location.href;
    return (
        <div className="web_site">
            <section className="bloc1">
                <div className="titre">
                    <h1>FITNESS LIFE</h1>
                    <Info />

                    <div className="stats-container">
                        <Stat contity="290" nom="happy customers" />
                        <Stat contity="175" nom="professional trainer" />
                        <Stat contity="190" nom="fitness workshop" />
                    </div>
                    <div className="flex flex-col items-center p-4 shadow-lg rounded-2xl" id='qrcode'>
                        <QRCodeCanvas
                            value={url} size={200} bgColor="#ffffff"
                            fgColor="#000000"
                            level="H" />
                        <p className="mt-2 text-gray-600">Scan me </p>
                    </div>

                </div>
                <div className="images">
                    <img src="https://res.cloudinary.com/dtdnbgbrp/image/upload/v1776876657/png_3_q62hsh.png"
                        className="hero"></img>
                    <Icon />




                </div>
            </section>
            <div className="bar">
                <div className="scroll-container">
                    <span >SMART WORKOUT TRACKING ✿ AUTOMATIC CALORIE CALCULATION ✿ EXERCICE VIDEO LIBRARY ✿ FITNESS EAQUIPMENT MARKET</span>
                    <span >SMART WORKOUT TRACKING ✿ AUTOMATIC CALORIE CALCULATION ✿ EXERCICE VIDEO LIBRARY ✿ FITNESS EAQUIPMENT MARKET</span>
                    <span >SMART WORKOUT TRACKING ✿ AUTOMATIC CALORIE CALCULATION ✿ EXERCICE VIDEO LIBRARY ✿ FITNESS EAQUIPMENT MARKET</span>
                    <span >SMART WORKOUT TRACKING ✿ AUTOMATIC CALORIE CALCULATION ✿ EXERCICE VIDEO LIBRARY ✿ FITNESS EAQUIPMENT MARKET</span>
                </div>
            </div>
            <section className="bloc2">
                <div className="bloc2_1">
                    <div className="why_image">
                        <img src="https://res.cloudinary.com/dtdnbgbrp/image/upload/v1776876658/png_2_auncz3.png">
                        </img>

                    </div>
                    <div className="why_choose_us">
                        <p className="title">why choose our</p><span id="fitness">fitness</span>
                        <div class="feature">
                            <div class="check">✔</div>
                            <div class="text">
                                <h3>Smart Workout Tracking</h3>
                                <p>Track your workouts and monitor your progress with an easy-to-use system.</p>
                            </div>
                        </div>
                        <div class="feature">
                            <div class="check">✔</div>
                            <div class="text">
                                <h3>Automatic Calorie Calculation</h3>
                                <p>Our system calculates burned calories and suggests your nutritional needs.</p>
                            </div>
                        </div>
                        <div class="feature">
                            <div class="check">✔</div>
                            <div class="text">
                                <h3>Exercise Video Library</h3>
                                <p>Access guided workout videos including cardio and strength training</p>

                            </div>
                        </div>
                        <div class="feature">
                            <div class="check">✔</div>
                            <div class="text">
                                <h3>Fitness Equipment Market</h3>
                                <p> Explore sports products that help improve your training performance</p>

                            </div>
                        </div>

                    </div>
                </div>
                <div className="what_client_say">
                    <div className="what_happy">
                        <p>WHAT OUR HAPPY</p>
                        <p>CLIENTS SAY ABOUT US</p>
                    </div>
                    <Info />

                </div>




            </section>
            <section className="bloc3">
                <img src="https://res.cloudinary.com/dtdnbgbrp/image/upload/v1776876658/png_1_taunmd.png"
                    className="man_image" />
                <div className="clien_opinion">
                    <div class="reviews-container">


                        <div class="review-item">
                            <h3>Jacob Jones</h3>
                            <span class="role">Member</span>
                            <div class="stars">★★★★☆</div>
                            <p>"This platform really helped me track my workouts and understand how many calories I burn during each training session. The exercise videos are very helpful and easy to follow."</p>
                        </div>

                        <div class="review-item">
                            <h3>Sarah M.</h3>
                            <span class="role">Member</span>
                            <div class="stars">★★★★★</div>
                            <p>"I love the nutrition recommendations and the simple interface. It helps me stay motivated and keep improving my fitness progress every week."</p>
                        </div>

                        <Icon />
                    </div>


                </div>
            </section>
        </div>
    );
}