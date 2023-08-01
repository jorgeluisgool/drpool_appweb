import { Password } from "primereact/password"

export const InputPassword = ({ valor = '', onChangevalor, onError = false }) => {
    return (
        <>
            <span className="p-float-label">
                <Password id="pass" value={valor} onChange={onChangevalor} feedback={false} toggleMask className={onError && "p-invalid"} />
                <label htmlFor="pass">Contraseña</label>
            </span>
            {onError && <small className="p-error">La contraseña es necesaria para poder continuar</small>}
        </>
    )
}