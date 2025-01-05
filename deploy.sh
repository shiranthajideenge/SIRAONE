echo "Building the docker image siraone"
docker buildx build --platform linux/amd64 --no-cache -t shiransilva143/siraone .
echo "Pushing docker image siraone to the docker hub"
docker push shiransilva143/siraone
echo "Uninstalling the previous helm chart siraone"
helm uninstall siraone
echo "Installing the new chart with the changes"
helm install siraone ./helm

#kubectl create secret tls siraone-tls \
#  --cert=domain.cert.pem \
#  --key=private.key.pem
