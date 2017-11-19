import { h } from 'preact';
import { Button } from './../'

export default ({ children, onInput, onSubmit, submitTxt, submitBtnState, action }) => {
    submitBtnState = submitBtnState || 'btn-primary'
    return (
        <form class="form" onSubmit={onSubmit}>
            <div class="form-group">
                {children}
            </div>
            <Button data-test-id={action} text={submitTxt} className={`centered ${submitBtnState}`} />
        </form>
    )
}
