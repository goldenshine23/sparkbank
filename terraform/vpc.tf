### resources.tf

# Create VPC
resource "aws_vpc" "sparkbank" {
  cidr_block           = "10.0.0.0/16"
  enable_dns_support   = true
  enable_dns_hostnames = true

  tags = {
    Name = "sparkbank-vpc"
  }
}

# Subnets
resource "aws_subnet" "public_1" {
  vpc_id            = aws_vpc.sparkbank.id
  cidr_block        = "10.0.1.0/24"
  availability_zone = "eu-west-2a"
  tags = { Name = "sparkbank-public-1" }
}

resource "aws_subnet" "public_2" {
  vpc_id            = aws_vpc.sparkbank.id
  cidr_block        = "10.0.2.0/24"
  availability_zone = "eu-west-2b"
  tags = { Name = "sparkbank-public-2" }
}

# Internet Gateway and Route Table
resource "aws_internet_gateway" "igw" {
  vpc_id = aws_vpc.sparkbank.id
  tags = { Name = "sparkbank-igw" }
}

resource "aws_route_table" "public_rt" {
  vpc_id = aws_vpc.sparkbank.id

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.igw.id
  }
  tags = { Name = "sparkbank-public-rt" }
}

resource "aws_route_table_association" "a1" {
  subnet_id      = aws_subnet.public_1.id
  route_table_id = aws_route_table.public_rt.id
}

resource "aws_route_table_association" "a2" {
  subnet_id      = aws_subnet.public_2.id
  route_table_id = aws_route_table.public_rt.id
}