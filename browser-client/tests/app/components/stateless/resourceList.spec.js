import { h } from 'preact'; /** @jsx h */
import chai, { expect } from 'chai';
import assertJsx from 'preact-jsx-chai';
chai.use(assertJsx);
assertJsx.options.functions = false;

import ResourceList from '../../../../src/app/components/stateless/resourceList'

describe('<ResourceList />', () => {

    it('renders empty resource list', done => {

        let props = {
            tag: {
                configuration: {
                    resources: []
                }
            }
        }

        expect(
            <ResourceList {...props} />
        ).to.contain(
            <div>
              <h3>Resources</h3>
            </div>
        );

        done()
    })

    describe('AWS', () => {
        it('renders resource list for serverless service', done => {

            let props = {
                matches: {
                    project: 'fa10a3d5-e4ab-4b0b-ad37-841a8631d036',
                    tagId: 'some-tag-id'
                },
                tag: {
                    configuration: {
                        "title": "first",
                        "project": "fa10a3d5-e4ab-4b0b-ad37-841a8631d036",
                        "environmentVariables": {},
                        resources: [
                            {
                                "id": "HelloWorldApp",
                                "provider": "AWS",
                                "service": "Serverless",
                                "regions": [
                                    "Ireland"
                                ],
                                "properties": {
                                    "directory": "./HelloWorldApp/",
                                    "entry": "index.js",
                                    "language": "nodejs"
                                },
                                "cloudVendorInformation": {
                                    "Ireland": {
                                        "restApiId": "d2fc555a",
                                        "vendorRegion": "eu-west-1"
                                    }
                                }
                            }
                        ]
                    }
                }
            }

            expect(
                <ResourceList {...props} />
            ).to.contain(
                <div>
                    <h3>Resources</h3>
                    <section>
                        <p>Resource type Serverless on the AWS platform, in Ireland</p>
                        <a
                        href="https://d2fc555a.execute-api.eu-west-1.amazonaws.com/Prod/"
                        target="_blank"
                        >
                        Visit endpoint
                        </a>
                        <form
                            action="https://localhost:5000/project/fa10a3d5-e4ab-4b0b-ad37-841a8631d036/tag/some-tag-id/deploy"
                            encType="multipart/form-data"
                            method="POST"
                        >
                            <input
                                name="serverless_zip"
                                type="file"
                            />
                            <input
                                type="submit"
                                value="Deploy"
                            />
                        </form>
                    </section>
                </div>
            );

            done()
        })

        it('renders resource list for static service', done => {

            let props = {
                matches: {
                    project: 'fa10a3d5-e4ab-4b0b-ad37-841a8631d036',
                    tagId: 'some-tag-id'
                },
                tag: {
                    configuration: {
                        "title": "first",
                        "project": "fa10a3d5-e4ab-4b0b-ad37-841a8631d036",
                        "environmentVariables": {},
                        resources: [
                            {
                                "regions": [
                                    "England"
                                ],
                                "provider": "AWS",
                                "service": "StaticFileStore",
                                "cloudVendorInformation": {
                                    "England": {
                                        "bucket": "s02c878623ec143a5a2beff4b1adc0bb7"
                                    }
                                },
                                "id": "Images",
                                "properties": {
                                    "accessibility": "public",
                                    "directory": "./images"
                                }
                            }
                        ]
                    }
                }
            }

            expect(
                <ResourceList {...props} />
            ).to.contain(
                <div>
                    <h3>Resources</h3>
                    <section>
                        <p>Resource type StaticFileStore on the AWS platform, in England</p>
                        <form
                            action="https://localhost:5000/project/fa10a3d5-e4ab-4b0b-ad37-841a8631d036/tag/some-tag-id/deploy"
                            encType="multipart/form-data"
                            method="POST"
                        >
                            <input
                                name="folderPath"
                                type="text"
                            />
                            <input
                                name="static_file"
                                type="file"
                            />
                            <input
                                type="submit"
                                value="Deploy"
                            />
                        </form>
                    </section>
                </div>
            );

            done()
        })
    })

    describe('GCP', () => {
        it('renders resource list for serverless service', done => {

            let props = {
                matches: {
                    project: 'fa10a3d5-e4ab-4b0b-ad37-841a8631d036',
                    tagId: 'some-tag-id'
                },
                tag: {
                    configuration: {
                        "title": "first",
                        "project": "fa10a3d5-e4ab-4b0b-ad37-841a8631d036",
                        "environmentVariables": {},
                        resources: [
                            {
                                "id": "HelloWorldApp",
                                "provider": "GCP",
                                "service": "Serverless",
                                "regions": [
                                    "Iowa"
                                ],
                                "properties": {
                                    "directory": "./HelloWorldApp/",
                                    "entry": "index.js",
                                    "language": "nodejs"
                                },
                                "cloudVendorInformation": {
                                    "Iowa": {
                                        "functionId": "s0800a3bdf7244e3298dc17d4d2fc555a"
                                    }
                                }
                            }
                        ]
                    }
                }
            }

            expect(
                <ResourceList {...props} />
            ).to.contain(
                <div>
                    <h3>Resources</h3>
                    <section>
                        <p>Resource type Serverless on the GCP platform, in Iowa</p>
                        <form
                            action="https://localhost:5000/project/fa10a3d5-e4ab-4b0b-ad37-841a8631d036/tag/some-tag-id/deploy"
                            encType="multipart/form-data"
                            method="POST"
                        >
                            <input
                                name="serverless_zip"
                                type="file"
                            />
                            <input
                                type="submit"
                                value="Deploy"
                            />
                        </form>
                    </section>
                </div>
            );

            done()
        })

        it('renders resource list for static service', done => {

            let props = {
                matches: {
                    project: 'fa10a3d5-e4ab-4b0b-ad37-841a8631d036',
                    tagId: 'some-tag-id'
                },
                tag: {
                    configuration: {
                        "title": "first",
                        "project": "fa10a3d5-e4ab-4b0b-ad37-841a8631d036",
                        "environmentVariables": {},
                        resources: [
                            {
                                "regions": [
                                    "England"
                                ],
                                "provider": "GCP",
                                "service": "StaticFileStore",
                                "cloudVendorInformation": {
                                    "England": {
                                        "bucket": "s02c878623ec143a5a2beff4b1adc0bb7"
                                    }
                                },
                                "id": "Images",
                                "properties": {
                                    "accessibility": "public",
                                    "directory": "./images"
                                }
                            }
                        ]
                    }
                }
            }

            expect(
                <ResourceList {...props} />
            ).to.contain(
                <div>
                    <h3>Resources</h3>
                    <section>
                        <p>Resource type StaticFileStore on the GCP platform, in England</p>
                        <form
                            action="https://localhost:5000/project/fa10a3d5-e4ab-4b0b-ad37-841a8631d036/tag/some-tag-id/deploy"
                            encType="multipart/form-data"
                            method="POST"
                        >
                            <input
                                name="folderPath"
                                type="text"
                            />
                            <input
                                name="static_file"
                                type="file"
                            />
                            <input
                                type="submit"
                                value="Deploy"
                            />
                        </form>
                    </section>
                </div>
            );

            done()
        })
    })

})

