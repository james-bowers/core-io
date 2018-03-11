import { h } from 'preact'; /** @jsx h */
import chai, { expect } from 'chai';
import assertJsx from 'preact-jsx-chai';
chai.use(assertJsx);
assertJsx.options.functions = false;

import Input from '../../../../src/app/components/stateless/input'

describe('<Input />', () => {

    it('text input', done => {

        expect(
            <Input type='text' />
        ).to.contain(
            <div class="form-group" >
            <span></span>
            <input class="form-input" type="text" />
            </div>
        );

        done()
    })

    it('text input with label', done => {

        expect(
            <Input type='text' label='Basic text input' />
        ).to.contain(
            <div class="form-group" >
                <label class="form-label">Basic text input</label>
                <input class="form-input" type="text" label="Basic text input" />
            </div>
        );

        done()
    })

    it('select input', done => {

        expect(
            <Input type='select'>
                <option value="1">one</option>
                <option value="2">two</option>
            </Input>
        ).to.contain(
            <div class="form-group">
                <span></span>
                <select class="form-select" type="select" value="1">
                    <option value="1">one</option>
                    <option value="2">two</option>
                </select>
            </div>
        );

        done()
    })

    it('textarea input', done => {

        expect(
            <Input type='textarea' value='Hello' />
        ).to.contain(
            <div class="form-group">
                <span></span>
                    <textarea
                        class="form-input"
                        rows="15"
                        type="textarea"
                        value="Hello">
                        Hello
                    </textarea>
            </div>
        );

        done()
    })

    it('AddOnTxt input without prefix', done => {

        expect(
            <Input type='AddOnTxt' value='Hello' />
        ).to.contain(
            <div class="form-group">
                <span></span>
                <div class="input-group">
                <span class="input-group-addon"></span>
                <input
                    class="form-input"
                    data-type="input"
                    type="AddOnTxt"
                    value="Hello"
                    />
                </div>
            </div>
        );

        done()
    })

    it('AddOnTxt input with prefix', done => {

        expect(
            <Input type='AddOnTxt' value='Hello' prefix='Example prefix' />
        ).to.contain(
            <div class="form-group">
                <span></span>
                <div class="input-group">
                    <span class="input-group-addon">Example prefix</span>
                    <input
                        prefix="Example prefix"
                        class="form-input"
                        data-type="input"
                        type="AddOnTxt"
                        value="Hello"
                    />
                </div>
            </div>
        );

        done()
    })

})

