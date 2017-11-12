# How this all works

a user account has multiple projects
each project has multiple tags (versions), but a single config.core-io.json
each tag has unique properties, such as: session variables, lock status (prevents deletion)

#### Getting the library
`const cloudLibrary = require('./cloud-library')`

```JavaScript
cloudLibrary(/* config.core-io.json */)
```

## Tags

#### Create a new tag
```JavaScript
cloudLibrary(/* config.core-io.json */)('create')(/* tag name */)
```

#### Update lock status of a tag
```JavaScript
cloudLibrary(/* config.core-io.json */)('tag')('lock')(true/false)
```

#### Update session variables for a tag
```JavaScript
cloudLibrary(/* config.core-io.json */)('tag')('sessionVariables')({sessionVarOne: 'some value'})
```

#### Remove resources for a tag
```JavaScript
cloudLibrary(/* config.core-io.json */)('tag')('tearDown')()
```

#### Deploy code to a resource
```JavaScript
cloudLibrary(/* config.core-io.json */)('tag')('deploy')(/* ID of resource in config to deploy */)
```