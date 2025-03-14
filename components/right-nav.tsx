import { useEffect, useState, useRef } from "react";
import Username from "@/components/Username";

const RightNav = () => {
    return (
        <div className="flex items-center gap-4">
            <Username />
        </div>
    );
};

export default RightNav;