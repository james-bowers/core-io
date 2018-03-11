import { h } from 'preact'; /** @jsx h */
import chai, { expect } from 'chai';
import assertJsx from 'preact-jsx-chai';
chai.use(assertJsx);
assertJsx.options.functions = false;

import Section from '../../../../src/app/components/stateless/section'

describe('<Section />', () => {

    it('renders normal section', done => {

        expect(
            <Section>
                <p>some content</p>
            </Section>
        ).to.contain(
            <section>
              <p>some content</p>
            </section>
        );

        done()
    })

})

