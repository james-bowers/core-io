let program = require('./src/cloud-library')

let projectConfiguration = {
    project: 'example-project-id',
    resources: [
        {
            "id": "Images",
            "provider": "AWS",
            "service": "StaticFileStore",
            "regions": ["England"],
            "properties": {
                "directory": "./images",
                "accessibility": "public"
            }
        }
    ]
}

// program(projectConfiguration)('create')('testing')

program(projectConfiguration)('deploy')('testing')