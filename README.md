# intercloud
## Requirements:
### cloud credentials file to give access to your GCP and AWS accounts

#### Location
```
./backend-server-system/src/cloud-resource-library/services/cloud-credentials.json
```

#### Format
```
{
    "aws": {
        "accessKeyId": "...",
        "secretAccessKey": "...",
        "accountId": "..."
    },
    "gcp": {
        "type": "service_account",
        "project_id": "...",
        "private_key_id": "...",
        "private_key": "...",
        "client_email": "...",
        "client_id": "...",
        "auth_uri": "...",
        "token_uri": "...",
        "auth_provider_x509_cert_url": "...",
        "client_x509_cert_url": "..."
    }
}
```
