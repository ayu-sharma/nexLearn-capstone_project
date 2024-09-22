import React from "react";
import Signup_carousal_light from "../Array/Signup_carousal_array";

const Signup_carousal = () => {
    return (
        <div className="">
            {Signup_carousal_light.map(item => (
                <div key={item.id} className="h-[90vh] bg-[linear-gradient(180deg,_#D2D6DB_30%,_#707275_100%)] rounded w-[400px] mx-10 p-4 overflow-auto">
                    <div className="">
                    <div
                        dangerouslySetInnerHTML={{ __html: item.text }}
                        className="text-center mb-4"
                    />

                    {item.image && (
                        <img
                            src={item.image}
                            alt={`Carousel item ${item.id}`}
                            className="w-full h-auto rounded"
                        />
                    )}
                </div>
                </div>
            ))}
        </div>
    );
};

export default Signup_carousal;
