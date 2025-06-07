### outputs.tf

output "vpc_id" {
  value = aws_vpc.sparkbank.id
}

output "public_subnet_ids" {
  value = [aws_subnet.public_1.id, aws_subnet.public_2.id]
}

output "ec2_instance_id" {
  value = aws_instance.my_ec2.id
}

output "ec2_instance_public_ip" {
  value = aws_instance.my_ec2.public_ip
}

output "ecr_repository_url" {
  value = aws_ecr_repository.ecr_repo.repository_url
}

output "eks_cluster_name" {
  value = aws_eks_cluster.eks_cluster.name
}

output "eks_cluster_endpoint" {
  value = aws_eks_cluster.eks_cluster.endpoint
}
