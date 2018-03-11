import { h } from 'preact'; /** @jsx h */
import chai, { expect } from 'chai';
import assertJsx from 'preact-jsx-chai';
chai.use(assertJsx);
assertJsx.options.functions = false;

import TagForm from '../../../../src/app/components/stateless/tagForm'

describe('<TagForm />', () => {

    it('renders tag form', done => {

        let props = {
            action: 'tag-form',
            submitTxt:'submit tag', 
            onSubmit: () => {}, 
            config: JSON.stringify({}), 
            tagName: 'new tag'
        }

        expect(
            <TagForm {...props} />
        ).to.contain(
            <form class="form">
              <div class="form-group">
                <div class="form-group">
                  <label
                    class="form-label"
                    for="tagName"
                  >
                    Tag name
                  </label>
                  <input
                    class="form-input"
                    id="tagName"
                    label="Tag name"
                    placeholder="Name of the tag"
                    value="new tag"
                   />
                </div>
                <div class="form-group">
                  <label
                    class="form-label"
                    for="config"
                  >
                    Project config
                  </label>
                  <textarea
                    class="form-input"
                    id="config"
                    label="Project config"
                    placeholder='{}'
                    rows="15"
                    type="textarea"
                  >
                  </textarea>
                </div>
              </div>
              <button
                class="btn centered btn-primary"
                data-test-id="button_tag-form"
              >
                submit tag
              </button>
            </form>
        );

        done()
    })

})

