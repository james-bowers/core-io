# Configuring a project

## Resource endpoints can be hit using a proxy
To result in resources being available at URLs such as the following:

`<resource-id>.<region>.<project-id>.<tag>.proxy.core-io.com`

A record of the 'actual' endpoints for resources that a url in the above format matches to,
will be stored, so can be accessed in order 1 speed. Those records will be updated when resources
are updated.

##### Additional benefits:
The proxy server could also block certain resources from being accessed, unless they have a
valid cert for that project. This means test environments can be secured easily.

By using a proxy, latency based routing rules can be managed for just one domain and its subdomains.

## Project configuration
Each project will store:
- AWS & GCP access keys
- User email address, one-to-many relationship with projects
- Environment variables for the live environment
- A tag (so same application can be duplicated for different environments)
- A 'lock' so that certain stacks with a specific 'tag' cannot be deleted

## Application configuration
- This is a single `config.core-io.json` file, and specifies the resources for the application.
- Each resource service exports values by default, which are set as environment variables where applicable.
- Each resource exports will have a namespace, using the service type and ID of the resource. e.g `StaticFileStore::Images::<variable name>`
- Exports include values such as:
  - Bucket names
  - Amazon Resource Name (ARN)
  - Database access username & password (which would be generated on DB creation)

### Regions
- I will have to offer a more generic, subset of regions for cloud anonymity.
- Some services can allow multiple regions, e.g Serverless. But others will be limited to one, e.g SQL.
