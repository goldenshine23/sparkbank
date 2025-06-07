### variables.tf

variable "ami_id" {
  description = "AMI ID for EC2"
  type        = string
  default     = "ami-051fd0ca694aa2379"
}

variable "instance_type" {
  description = "EC2 instance type"
  type        = string
  default     = "t2.micro"
}

variable "instance_name" {
  description = "Name for EC2 instance"
  type        = string
  default     = "sparkbank"
}

variable "ecr_repo_name" {
  description = "Name for the ECR repository"
  type        = string
  default     = "sparkbank-repo"
}

variable "eks_cluster_name" {
  description = "EKS Cluster Name"
  type        = string
  default     = "sparkbank-eks"
}

variable "subnet_ids" {
  description = "Subnet IDs for EKS cluster"
  type        = list(string)
  default     = []
}