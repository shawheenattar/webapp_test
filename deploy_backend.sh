echo "Deploying Backend..."
cd backend
aws ecr get-login-password --region us-west-2 | docker login --username AWS --password-stdin 131351626744.dkr.ecr.us-west-2.amazonaws.com
docker build -t logicshare-backend .
docker tag logicshare-backend:latest 131351626744.dkr.ecr.us-west-2.amazonaws.com/logicshare-backend:latest
docker push 131351626744.dkr.ecr.us-west-2.amazonaws.com/logicshare-backend:latest
cd aws_deploy
eb deploy