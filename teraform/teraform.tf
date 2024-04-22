provider "google" {
  project = "kuberenetesassignment"
  region  = "us-central1"
}

resource "google_container_cluster" "my_cluster" {
  name     = "democluster"
  location = "us-central1-c"

  master_auth {
    client_certificate_config {
      issue_client_certificate = false
    }
  }

  node_pool {
    name         = "default-pool"
    node_count   = 1
    autoscaling {
      min_node_count = 1
      max_node_count = 1
    }
    management {
      auto_repair  = true
      auto_upgrade = true
    }
    node_config {
      oauth_scopes = [
        "https://www.googleapis.com/auth/logging.write",
        "https://www.googleapis.com/auth/monitoring",
        "https://www.googleapis.com/auth/devstorage.read_only",
        "https://www.googleapis.com/auth/servicecontrol",
        "https://www.googleapis.com/auth/service.management.readonly",
        "https://www.googleapis.com/auth/compute",
        "https://www.googleapis.com/auth/trace.append"
      ]
      labels = {}
      tags   = []
    }
  }

}