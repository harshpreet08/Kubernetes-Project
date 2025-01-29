# Kubernetes Project

Welcome to the Kubernetes Project repository! This project demonstrates how to deploy and manage containerized applications using Kubernetes. The focus is on showcasing scalable and robust infrastructure with tools like Terraform for provisioning and Docker for containerization.

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Directory Structure](#directory-structure)
- [Prerequisites](#prerequisites)
- [Setup Instructions](#setup-instructions)
- [Deployment Guide](#deployment-guide)
- [License](#license)

## Project Overview

This project contains two applications, `app1` and `app2`, both containerized and managed using Kubernetes. The infrastructure for the Kubernetes cluster is provisioned using Terraform to ensure repeatability and consistency. The applications demonstrate end-to-end containerized deployment, including load balancing, scaling, and networking.

The primary objective of this project is to provide hands-on experience with Kubernetes concepts such as Deployments, Services, ConfigMaps, and Persistent Volumes.

## Features

- Infrastructure provisioning using Terraform.
- Containerized applications managed with Kubernetes.
- YAML manifests for Deployments, Services, and ConfigMaps.
- Docker Compose for local testing.
- Scalable architecture with Kubernetes Horizontal Pod Autoscaling.
- Detailed logs and metrics for monitoring.

## Technologies Used

- **Kubernetes**: Orchestration of containerized applications.
- **Docker**: Containerization of applications.
- **Terraform**: Infrastructure as Code for Kubernetes cluster setup.
- **Helm** (optional): Managing Kubernetes applications.
- **Docker Compose**: Simplified local testing.

## Directory Structure

```
├── app1/
│   ├── Dockerfile
│   ├── k8s/
│   │   ├── deployment.yaml
│   │   ├── service.yaml
│   │   └── configmap.yaml
│   └── src/
│       └── ...
├── app2/
│   ├── Dockerfile
│   ├── k8s/
│   │   ├── deployment.yaml
│   │   ├── service.yaml
│   │   └── configmap.yaml
│   └── src/
│       └── ...
├── terraform/
│   ├── main.tf
│   ├── variables.tf
│   ├── outputs.tf
│   └── ...
├── docker-compose.yml
└── README.md
```

## Prerequisites

Ensure you have the following installed:

- [Docker](https://docs.docker.com/get-docker/)
- [Kubernetes CLI (kubectl)](https://kubernetes.io/docs/tasks/tools/)
- [Terraform](https://www.terraform.io/downloads.html)
- [Helm](https://helm.sh/docs/intro/install/) (if using Helm charts)
- Kubernetes cluster (e.g., Minikube, GKE, or EKS)

## Setup Instructions

### Clone the Repository

```bash
git clone https://github.com/harshpreet08/Kubernetes-Project.git
cd Kubernetes-Project
```

### Provision Infrastructure

Navigate to the `terraform/` directory and apply the configurations:

```bash
cd terraform
terraform init
terraform apply
```

This sets up the Kubernetes cluster and required resources.

### Build Docker Images

For each application, navigate to its directory and build the Docker image:

```bash
cd app1
docker build -t app1:latest .

cd ../app2
docker build -t app2:latest .
```

Push the images to a container registry if needed (e.g., Docker Hub or ECR).

### Deploy Applications to Kubernetes

Apply the Kubernetes manifests for each application:

```bash
kubectl apply -f app1/k8s/
kubectl apply -f app2/k8s/
```

Verify the deployments:

```bash
kubectl get pods
kubectl get services
```

### Optional: Local Testing

Use Docker Compose for local testing:

```bash
docker-compose up
```

## Deployment Guide

1. **Monitor Pods**:

   ```bash
   kubectl get pods --watch
   ```

2. **Scale Deployments**:

   ```bash
   kubectl scale deployment app1 --replicas=3
   kubectl scale deployment app2 --replicas=3
   ```

3. **Access Applications**:

   - Use the Kubernetes Service IP or Ingress URL to access the applications.

4. **Logs and Metrics**:
   ```bash
   kubectl logs <pod-name>
   kubectl top pods
   ```

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
