
resource "aws_instance" "my_ec2" {
  ami           = "ami-051fd0ca694aa2379" # Replace with your region-specific AMI
  instance_type = "t2.micro"

  tags = {
    Name = "sparkbank"
  }
}