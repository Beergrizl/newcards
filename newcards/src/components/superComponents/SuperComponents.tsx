import React from "react";
import SuperInputText from "./superInputText/SuperInputText";
import SuperButton from "./superButton/SuperButton";
import SuperCheckbox from "./superCheckbox/SuperCheckbox";

export const SuperComponents: React.FC = () => {
    return (
        <div>
            <h2>SuperComponents</h2>
            <SuperInputText/>
            <SuperButton>
                click
            </SuperButton>
            <div>
                <SuperCheckbox/>
            </div>
        </div>
    )
}