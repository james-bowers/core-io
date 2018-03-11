import { h } from 'preact'; /** @jsx h */
import chai, { expect } from 'chai';
import assertJsx from 'preact-jsx-chai';
chai.use(assertJsx);
assertJsx.options.functions = false;

import ProjectForm from '../../../../src/app/components/stateless/projectForm'

describe('<ProjectForm />', () => {

    it('renders project form', done => {

        let onSubmit = () => {}
        let value = ''

        expect(
            <ProjectForm onSubmit={onSubmit} value={value} />
        ).to.contain(
            <form class="form">
              <div class="form-group">
                <div class="form-group">
                  <label
                    class="form-label"
                    for="title"
                  >
                    Project name
                  </label>
                  <input
                    class="form-input"
                    id="title"
                    label="Project name"
                    placeholder="Name of the new project"
                    value=""
                   />
                </div>
              </div>
              <button
                class="btn centered btn-primary"
                data-test-id="button_create-project"
              >
                Create
              </button>
            </form>
        );

        done()
    })

})

