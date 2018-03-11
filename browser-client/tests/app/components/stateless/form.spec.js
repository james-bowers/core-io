import { h } from 'preact'; /** @jsx h */
import chai, { expect } from 'chai';
import assertJsx from 'preact-jsx-chai';
chai.use(assertJsx);
assertJsx.options.functions = false;

import Form from '../../../../src/app/components/stateless/form'

describe('<Form />', () => {

    it('renders form without children', done => {

        let action = 'submit-form'
        let submitBtnState = 'loading'
        let submitTxt = 'Submit'
        let onSubmit = () => {}

        expect(
            <Form 
                action={action}
                submitBtnState={submitBtnState}
                submitTxt={submitTxt}
                onSubmit={onSubmit}/>
        ).to.contain(
            <form class="form">
              <div class="form-group"></div>
              <button
                class="btn centered loading"
                data-test-id="button_submit-form"
              >
                Submit
              </button>
            </form>
        );

        done()
    })

    it('renders form with children', done => {

        let action = 'submit-form'
        let submitBtnState = 'loading'
        let submitTxt = 'Submit'
        let onSubmit = () => { }

        expect(
            <Form
                action={action}
                submitBtnState={submitBtnState}
                submitTxt={submitTxt}
                onSubmit={onSubmit}>
                    <input />
                </Form>
        ).to.contain(
            <form class="form">
                <div class="form-group">
                    <input />
                </div>
                <button
                    class="btn centered loading"
                    data-test-id="button_submit-form"
                >
                    Submit
              </button>
            </form>
        );

        done()
    })

})

