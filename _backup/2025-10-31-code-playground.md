---
layout: post
title: "Terraform AWS Security Best Practices"
toc: true
---

## Interactive Terraform Lab

Try editing this secure Kubernetes manifest below:

{% include code-playground.html code="resource \"aws_security_group\" \"example\" {
  name = \"secure-sg\"
  
  ingress {
    from_port   = 443
    to_port     = 443
    protocol    = \"tcp\"
    cidr_blocks = [\"0.0.0.0/0\"]
  }
  
  egress {
    from_port   = 0
    to_port     = 0
    protocol    = \"-1\"
    cidr_blocks = [\"0.0.0.0/0\"]
  }
}" %}
