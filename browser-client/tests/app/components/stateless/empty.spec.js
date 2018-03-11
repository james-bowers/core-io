import { h } from 'preact'; /** @jsx h */
import chai, { expect } from 'chai';
import assertJsx from 'preact-jsx-chai';
chai.use(assertJsx);
assertJsx.options.functions = false;

import Empty from '../../../../src/app/components/stateless/empty'

describe('<Empty />', () => {

    it('renders empty without children', done => {

        expect(
            <Empty title='A title' subject='A given subject' />
        ).to.contain(
            <div class="empty">
              <div class="empty-icon">
                <i class="icon icon-people"></i>
              </div>
              <p class="empty-title h5">A title</p>
              <p class="empty-subtitle">A given subject</p>
              <div class="empty-action"></div>
            </div>
        );

        done()
    })

    it('renders empty with children', done => {

        expect(
            <Empty title='A title' subject='A given subject'>
                <p>There were no results.</p>
            </Empty>
        ).to.contain(
            <div class="empty">
                <div class="empty-icon">
                    <i class="icon icon-people"></i>
                </div>
                <p class="empty-title h5">A title</p>
                <p class="empty-subtitle">A given subject</p>
                <div class="empty-action">
                    <p>There were no results.</p>
                </div>
            </div >
        );

        done()
    })

})

