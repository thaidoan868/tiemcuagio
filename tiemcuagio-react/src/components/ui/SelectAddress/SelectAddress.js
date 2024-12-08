import { useState } from "react"
import styles from "./SelectAddress.module.css"

export default function SelectAddress(props) {
    let hcmUnits= require('./json/hcm_units.json');
    const [districtIndex, setDistrictIndex] = useState(undefined);

    function districtRender() {
        const province = hcmUnits;
        return province.District.map((district, i) => 
            <option 
                value={district.FullName} 
                key={i}
            >
                {district.FullName}
            </option>
        )
    }
    function wardRender() {
        if (districtIndex || districtIndex === 0) {
            const district = hcmUnits.District[districtIndex]
            return district.Ward.map((ward, i) =>
                <option 
                    value={ward.FullName} 
                    key={i+Math.random()}
                >
                    {ward.FullName}
                </option>
            )
        }
    }

    return <div className={styles.selectAddress}>
        <div>
            <select name="ward" required="required">
                <option value="">Chọn phường</option>
                { wardRender()}
            </select>
        </div>
        <div>
            <select 
                name="district" 
                required="required"
                onChange={(e) => {
                    const districtName = e.target.value;
                    let districtIndex = 0;
                    hcmUnits.District.map((district, index) => {
                        if (district.FullName === districtName)
                            districtIndex = index
                    })
                    setDistrictIndex(districtIndex);
                }}
            >
                <option value="">Chọn quận</option>
                { districtRender() }
            </select>
        </div>
        <div>
            <select name="province">
                <option value="Tp Hồ Chí Minh">Tp Hồ Chí Minh</option>
            </select>
        </div>
    </div>
}