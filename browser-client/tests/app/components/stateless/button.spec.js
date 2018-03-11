import { h } from 'preact'; /** @jsx h */
import chai, { expect } from 'chai';
import assertJsx from 'preact-jsx-chai';
chai.use(assertJsx);
assertJsx.options.functions = false;

import Button from '../../../../src/app/components/stateless/button'

describe('<Button />', () => {

    it('renders normal button', done => {

        expect(
            <Button text='example' />
        ).to.contain(
            <button class="btn " data-test-id="button_">example</button>
        );

        done()
    })

    it('renders hyperlink button', done => {

        expect(
            <Button text='example' href='/example-path' />
        ).to.contain(
            <a data-test-id="link_" href='/example-path'>
                <button class="btn ">example</button>
            </a>
        );

        done()
    })

    it('adds test id', done => {

        expect(
            <Button data-test-id='test-me-button' text='example' />
        ).to.contain(
            <button data-test-id="button_test-me-button" class="btn ">example</button>
        );

        done()
    })

})

