This is a demo query form for the lexical entity inventory.

It is deployed at http://www.perseids.org/tools/lexical

It calls the morphology service at http://services.perseids.org/bsp/morphologyservice

It extracts the lemmas from the response and queries the lexical inventory via the proxy at http://perseids.org/queries/morpheus

This proxy is implemented via a mod_apache rewrite rule

RewriteRule         ^/queries/morpheus/(.*?)/(.*?)$  http://localhost/sparql-proxy/ds/query?query=SELECT+?urn+?replacedby+FROM+<http\%3A\%2F\%2Fdata.perseus.org\%2Fds\%2Flexical\%2Flatlexent>+WHERE+{{?urn+<http\%3A\%2F\%2Fdata.perseus.org\%2Frdfvocab\%2Flexical\%2FhasMorpheusLemma>+"$2"@$1}+UNION+{?urn+<http\%3A\%2F\%2Fdata.perseus.org\%2Frdfvocab\%2Flexical\%2FhasMorpheusLemma>+"$2"@$1.+?urn+<http\%3A\%2F\%2Fpurl.org\%2Fdc\%2Fterms\%2FisReplacedBy>+?replacedby}}&output=xml [P,NE]

Which itself is a request to an apache proxy to fuseki

<Location /sparql-proxy>
    ProxyPass http://services.perseids.org/fuseki
    ProxyPassReverse http://services.perseids.org/fuseki
    Header set Content-Type text/xml
</Location>

The results are Lexical Inventory URIs which are retrieved from the CITE Collections service

e.g. http://data.perseus.org/collections/urn:cts:perseus:latlexent.lex34070

Is implemented via and Apache mod_rewrite rule at data.perseus.org which requires r

http://services2.perseids.org/collections/api?req=GetObject&urn=urn:cite:perseus:latlexent.lex34070

