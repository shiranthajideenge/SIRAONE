// Dynamic Text Transitions
const texts = [
    "Unlock the Power of Technology with Us",
    "Software Development",
    "Kubernetes Transformation",
    "Middleware Integration",
    "Project Evaluation",
    "Solutions Architecture",
    "Post-Implementation Support"
];

let currentIndex = 0;

function changeText() {
    const textElement = document.getElementById("dynamic-text");

    // Fade out and slide the text
    textElement.style.transition = "transform 0.5s ease-out, opacity 0.5s ease-out";
    textElement.style.transform = "translateX(0%)";
    textElement.style.opacity = "0";

    // After fade-out, change the text and fade it back in with a slide-in effect
    setTimeout(() => {
        // Change the text content
        textElement.textContent = texts[currentIndex];

        // Reset for slide-in
        textElement.style.transition = "transform 0.8s cubic-bezier(0.68, -0.55, 0.27, 1.55), opacity 0.8s ease-in";
        textElement.style.transform = "translateX(0)";
        textElement.style.opacity = "1";

        // Update the index for the next text
        currentIndex = (currentIndex + 1) % texts.length;
    }, 1000); // Ensure this matches the fade-out duration
}


setInterval(changeText, 5000);
changeText();

// Hero Animation
document.addEventListener("DOMConoaded", () => {
    const heroContent = document.querySelector(".hero-content");
    if (heroContent) {
        heroContent.style.opacity = "1";
        heroContent.style.transform = "translateY(0)";
        heroContent.style.transition = "opacity 1s, transform 1s";
    }
});

// Hamburger Menu Toggle
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector("nav ul");

hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
});

navMenu.querySelectorAll("li a").forEach((link) => {
    link.addEventListener("click", () => {
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
    });
});

// Contact Form Submission
document.getElementById("contactForm").addEventListener("submit", async (event) => {
    event.preventDefault(); // Prevent form from reloading the page

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    try {
        const response = await fetch("https://sira.one/send-email", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name, email, message }),
        });

        const data = await response.json();
        if (data.success) {
            alert("Your message has been sent successfully!");
        } else {
            alert("Failed to send the message. Please try again.");
        }
    } catch (error) {
        console.error("Error:", error);
        alert("An error occurred. Please try again later.");
    }
});

// Floating Chat Icon Toggle
const chatIcon = document.getElementById("chatIcon");
const chatContainer = document.getElementById("chatContainer");

chatIcon.addEventListener("click", () => {
    chatContainer.classList.toggle("visible");
});

// Chatbot Interaction
document.getElementById("sendMessage").addEventListener("click", async () => {
    const userMessage = document.getElementById("userMessage").value.trim();

    if (userMessage !== "") {
        // Display user's message
        displayMessage(userMessage, "user");

        // Send message to the server (which will communicate with OpenAI)
        try {
            const response = await fetch("https://sira.one/chat", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ message: userMessage }),
            });

            const data = await response.json();
            if (data.success) {
                // Display ChatGPT's (Ravana's) response
                displayMessage(data.message, "bot");
            } else {
                displayMessage(
                    "Sorry, there was an error processing your message.",
                    "Ravana"
                );
            }
        } catch (error) {
            console.error("Error:", error);
            displayMessage("Sorry I am off line", "Ravana");
        }
    }
});

// Handle Enter Key to Send Message
document.getElementById("userMessage").addEventListener("keydown", function(event) {
    if (event.key === "Enter" && !event.shiftKey) { // Ensure it's just the Enter key and not Shift + Enter
        event.preventDefault(); // Prevent the default behavior (new line in textarea)
        sendMessage();
    }
});

// Handle send message
async function sendMessage() {
    const userMessage = document.getElementById("userMessage").value.trim();

    if (userMessage !== "") {
        // Display user's message
        displayMessage(userMessage, "user");

        // Send message to the server (which will communicate with OpenAI)
        try {
            const response = await fetch("https://sira.one/chat", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ message: userMessage }),
            });

            const data = await response.json();
            if (data.success) {
                // Display ChatGPT's (Ravana's) response
                displayMessage(data.message, "bot");
            } else {
                displayMessage(
                    "Sorry, there was an error processing your message.",
                    "bot"
                );
            }
        } catch (error) {
            console.error("Error:", error);
            displayMessage("Sorry I am off line", "bot");
        }
    }
}

function displayMessage(message, sender) {
    const chatBox = document.getElementById("chatBox");
    const messageDiv = document.createElement("div");
    messageDiv.classList.add("message");
    messageDiv.classList.add(sender);

    const avatar = document.createElement("div");
    avatar.classList.add("avatar");

    // Always show avatar for bot messages, not just the first one
    if (sender === "user") {
        const img = document.createElement("img");
        img.src = "user.png";  // Replace with the path to your user avatar
        img.alt = "User";
        avatar.appendChild(img);
    } else if (sender === "bot") {
        const img = document.createElement("img");
        img.src = "ravana_processed.png";  // Replace with the path to your bot avatar
        img.alt = "Bot (Ravana)";
        avatar.appendChild(img);
    }

    const textDiv = document.createElement("div");
    textDiv.classList.add("text");
    textDiv.innerHTML = message;

    messageDiv.appendChild(avatar);
    messageDiv.appendChild(textDiv);

    chatBox.appendChild(messageDiv);
    chatBox.scrollTop = chatBox.scrollHeight; // Scroll to the bottom
    document.getElementById("userMessage").value = ""; // Clear the input field
}


const serviceDetails = {
    "software-development": {
        title: "Software Development",
        content: `
         <p>Customized Solutions: Designed to fit your specific goals, workflows, and challenges.
            <li>Scalable and Maintainable Architecture: Grow with ease while ensuring simple maintenance.</li>
            <li>Agile Development Process: Transparency, flexibility, and fast delivery.</li>
            <li>Experienced Team: Leveraging the best practices and modern technologies.</li>
            <li>End-to-End Support: From ideation to deployment and beyond.</li></p>

        <h4>Mobile Application Development</h4>
        <p>We build feature-rich, user-friendly mobile applications for both <strong>Android</strong> and <strong>iOS</strong> platforms.</p>
        <ul>
            <li>Native Android and iOS Development</li>
            <li>Cross-Platform Apps using Flutter or React Native</li>
            <li>Custom UI/UX Design</li>
            <li>Integration with APIs and Backend Systems</li>
            <li>App Store Deployment</li>
        </ul>

        <h4>Web Application Development</h4>
        <p>Our web applications are designed to be highly interactive, scalable, and secure.</p>
        <ul>
            <li>Single-Page Applications (SPA) using React, Angular</li>
            <li>Backend Development using Java, Python, or NodeJs</li>
            <li>Database Management (SQL, MySQL, PostgreSQL, MongoDB)</li>
            <li>Cloud-Integrated Web Solutions (AWS, Azure, GCP)</li>
            <li>Secure and Scalable Architectures</li>
        </ul>

        <h4>Custom Software Development</h4>
        <p>We design and develop custom solutions tailored to your specific business objectives.</p>
        <ul>
            <li>Requirement Analysis and Feasibility Study</li>
            <li>Software Design and Architecture</li>
            <li>Agile Development with Regular Feedback</li>
            <li>Integration with Third-Party Tools and Services</li>
            <li>Maintenance and Support</li>
        </ul>

        <h2>Technologies We Use</h2>
        <ul>
            <li><strong>Programming Languages:</strong> Java, Python</li>
            <li><strong>Mobile Frameworks:</strong> Android SDK, iOS SDK, Flutter, React Native</li>
            <li><strong>Web Frameworks:</strong> Spring Boot, React.js, Angular</li>
            <li><strong>Databases:</strong> SQL, MySQL, PostgreSQL, MongoDB</li>
            <li><strong>Cloud & DevOps:</strong> AWS, GCP, Azure, Docker, Kubernetes, CI/CD Pipelines</li>
        </ul>
        `,
    },
    "digital-transformation": {
    title: "Kubernetes Transformation",
    content: `
        <p>We help businesses transition to a modern, scalable, and highly available infrastructure using Kubernetes.</p>

        <h4>End-to-End Kubernetes Deployment</h4>
        <p>We design, deploy, and manage Kubernetes clusters tailored to your business needs. From planning to implementation, we ensure that your applications are optimized for Kubernetes environments.</p>
        <ul>
            <li>Kubernetes Cluster Design and Architecture</li>
            <li>Custom Helm Charts for Application Deployment</li>
            <li>Scalable Infrastructure for Increased Efficiency</li>
            <li>Optimized Resource Management</li>
            <li>Continuous Integration/Continuous Deployment (CI/CD) Pipelines</li>
        </ul>

        <h4>Transform Legacy Systems to Kubernetes</h4>
        <p>If you're looking to migrate your existing non-Kubernetes infrastructure to Kubernetes, we provide comprehensive solutions for smooth and efficient transformation.</p>
        <ul>
            <li>Assessment of Current Infrastructure</li>
            <li>Containerization of Legacy Applications</li>
            <li>Cluster Configuration and Optimization</li>
            <li>Seamless Migration with Minimal Downtime</li>
            <li>Post-Deployment Support and Monitoring</li>
        </ul>

        <h4>Benefits of Kubernetes Transformation</h4>
        <p>Transforming your infrastructure with Kubernetes brings numerous benefits:</p>
        <ul>
            <li>Scalability: Handle increased workloads with ease</li>
            <li>Flexibility: Adapt to changing business needs faster</li>
            <li>High Availability: Ensure uptime and reliability for mission-critical applications</li>
            <li>Cost Efficiency: Optimize resource usage and reduce operational overhead</li>
        </ul>

        <h2>Technologies We Use</h2>
        <ul>
            <li><strong>Containerization:</strong> Docker</li>
            <li><strong>Kubernetes Tools:</strong> Helm, kubectl, Kustomize</li>
            <li><strong>Cloud Platforms:</strong> AWS, Azure, GCP</li>
            <li><strong>CI/CD Tools:</strong> Jenkins, GitLab CI, CircleCI</li>
            <li><strong>Monitoring:</strong> Prometheus, Grafana, ELK Stack</li>
        </ul>
    `,
    },
    "middleware-integration": {
    title: "Middleware Integration",
    content: `
        <p>We provide expert advice and services for integrating and optimizing middleware solutions, with a focus on enhancing integration and performance using WSO2 products. Our middleware integration services help organizations achieve seamless communication and data flow between disparate systems.</p>

        <h4>WSO2 API Management</h4>
        <p>Leverage the power of WSO2 API Manager to design, manage, and secure APIs with ease, enabling seamless connectivity between different services and applications.</p>
        <ul>
            <li>API Design and Documentation</li>
            <li>API Gateway Configuration</li>
            <li>OAuth and API Security Configurations</li>
            <li>API Analytics and Monitoring</li>
            <li>Version Control and Lifecycle Management</li>
        </ul>

        <h4>WSO2 Identity and Access Management</h4>
        <p>Optimize your authentication and authorization processes with WSO2 Identity Server, ensuring secure and scalable identity management.</p>
        <ul>
            <li>Single Sign-On (SSO) Integration</li>
            <li>Identity Federation and Access Control</li>
            <li>Multi-Factor Authentication (MFA)</li>
            <li>OAuth2, OpenID Connect, and SAML Configurations</li>
            <li>User Provisioning and Role-Based Access Control</li>
        </ul>

        <h4>Middleware Architecture Optimization</h4>
        <p>We help organizations design and implement robust middleware architectures that maximize the efficiency of data processing, reduce latency, and scale effectively.</p>
        <ul>
            <li>Integration of Heterogeneous Systems</li>
            <li>Message Queues and Event-Driven Architecture</li>
            <li>Distributed Middleware Solutions</li>
            <li>Load Balancing and Fault Tolerance</li>
            <li>High Availability and Disaster Recovery Plans</li>
        </ul>

        <h4>Custom Middleware Solutions</h4>
        <p>We offer customized middleware solutions tailored to your specific business needs, enabling your organization to optimize workflow automation, data synchronization, and real-time processing.</p>
        <ul>
            <li>Custom Integration Development</li>
            <li>Middleware Configuration and Tuning</li>
            <li>Performance Optimization and Benchmarking</li>
            <li>API Gateway and Microservices Integration</li>
            <li>Message Broker and Data Sync Solutions</li>
        </ul>

        <h2>Technologies We Use</h2>
        <ul>
            <li><strong>Middleware Platforms:</strong> WSO2 API Manager, WSO2 Identity Server</li>
            <li><strong>Integration Tools:</strong> Apache Kafka, RabbitMQ, ActiveMQ</li>
            <li><strong>Cloud & DevOps:</strong> AWS, GCP, Azure, Docker, Kubernetes</li>
            <li><strong>Security:</strong> OAuth2, OpenID Connect, SAML, LDAP</li>
            <li><strong>Performance Monitoring:</strong> Prometheus, Grafana, ELK Stack</li>
        </ul>
    `,
    },
    "poc-project-evaluation": {
    title: "Proof of Concept (PoC) & Project Evaluation",
    content: `
        <p>We provide comprehensive services for Proof of Concept (PoC) development and detailed project evaluations, helping you validate your ideas, technologies, and approaches before committing to full-scale implementation.</p>

        <h4>Proof of Concept (PoC) Development</h4>
        <p>Our PoC services are designed to help you test the feasibility of your concepts, technology stacks, and ideas in a controlled environment, reducing risks and making informed decisions.</p>
        <ul>
            <li>Rapid Prototyping of Ideas and Concepts</li>
            <li>Technology and Tool Selection for the PoC</li>
            <li>Real-World Use Case Testing</li>
            <li>Demonstration of Key Features and Capabilities</li>
            <li>Feedback Collection and Iteration for Improvement</li>
        </ul>

        <h4>Project Evaluation</h4>
        <p>We perform thorough evaluations of your project to assess feasibility, risks, and alignment with business objectives. Our evaluations provide you with actionable insights and a clear path forward.</p>
        <ul>
            <li>Detailed Feasibility Study and Risk Analysis</li>
            <li>Technology Stack Review and Recommendation</li>
            <li>Evaluation of Existing Architecture and Infrastructure</li>
            <li>Cost-Benefit Analysis and Resource Requirements</li>
            <li>Assessment of Scalability, Performance, and Security</li>
        </ul>

        <h4>Solution Design and Architecture</h4>
        <p>We assist in designing a robust and scalable architecture based on the results of the PoC and project evaluation, ensuring that the solution is optimized for both current needs and future growth.</p>
        <ul>
            <li>Architecture Design and Validation</li>
            <li>Cloud-Native Architecture and Microservices Design</li>
            <li>Scalable and High-Performance Solution Design</li>
            <li>Cost Optimization and Cloud Infrastructure Setup</li>
            <li>Security and Compliance Design</li>
        </ul>

        <h4>Technology and Vendor Selection</h4>
        <p>Our PoC and project evaluations help you make informed decisions about the technologies and vendors that best suit your requirements, minimizing implementation risks and optimizing performance.</p>
        <ul>
            <li>Evaluation of Technology Options and Compatibility</li>
            <li>Vendor Assessment and Recommendation</li>
            <li>Open-Source vs. Commercial Software Analysis</li>
            <li>Integration with Third-Party Tools and Services</li>
            <li>Long-Term Viability and Support Considerations</li>
        </ul>

        <h2>Technologies We Use</h2>
        <ul>
            <li><strong>Prototyping Tools:</strong> Figma, Sketch, InVision</li>
            <li><strong>Backend Technologies:</strong> Java, Python, Node.js</li>
            <li><strong>Cloud Platforms:</strong> AWS, GCP, Azure</li>
            <li><strong>Infrastructure Tools:</strong> Docker, Kubernetes, Terraform</li>
            <li><strong>Databases:</strong> SQL, NoSQL, PostgreSQL, MongoDB</li>
            <li><strong>Security:</strong> OAuth, SAML, JWT, SSL/TLS</li>
        </ul>
    `,
    },
    "solutions-architecture": {
    title: "Solutions Architecture",
    content: `
        <p>We provide expert solutions architecture services to design, implement, and scale complex systems tailored to meet your business needs. Our goal is to ensure that your technology stack, infrastructure, and applications are aligned with your long-term objectives, offering scalability, security, and performance.</p>

        <h4>Architectural Design & Strategy</h4>
        <p>Our architects work closely with your teams to define a clear, future-proof strategy for your systems. We design flexible architectures that can evolve with your business, ensuring both short-term and long-term success.</p>
        <ul>
            <li>Customized Architecture Design to Fit Your Business</li>
            <li>Cloud-Native Architecture, Microservices, and Serverless Design</li>
            <li>Data-Driven Solutions: Focused on scalability, performance, and data security</li>
            <li>Design for High Availability and Disaster Recovery</li>
            <li>Integration of Existing Systems into a Unified Architecture</li>
        </ul>

        <h4>Cloud Architecture</h4>
        <p>Our cloud architecture services help you build and optimize cloud-based systems, leveraging platforms such as AWS, Azure, and GCP. We ensure that your infrastructure is both cost-efficient and high-performing.</p>
        <ul>
            <li>Cloud-Native Applications & Services Design</li>
            <li>Multi-Cloud and Hybrid Cloud Solutions</li>
            <li>Cloud Infrastructure Management with Cost Optimization</li>
            <li>Security and Compliance Design for Cloud Environments</li>
            <li>Serverless and Containerized Solutions using Kubernetes and Docker</li>
        </ul>

        <h4>Microservices Architecture</h4>
        <p>We specialize in designing microservices architectures that are scalable, resilient, and easily maintainable. Whether you're migrating from monolithic applications or building from scratch, we offer solutions to meet your needs.</p>
        <ul>
            <li>Separation of Concerns and Modular Services</li>
            <li>Containerized Microservices using Docker and Kubernetes</li>
            <li>Integration with APIs and Event-Driven Architecture</li>
            <li>Service Discovery, Load Balancing, and Failover Strategies</li>
            <li>Monitoring, Logging, and Continuous Delivery Pipelines</li>
        </ul>

        <h4>System Integration</h4>
        <p>We integrate various systems and applications into a cohesive ecosystem, ensuring seamless data flow and communication across your enterprise architecture.</p>
        <ul>
            <li>Integration of On-Premise and Cloud-Based Systems</li>
            <li>API-First Architecture for Seamless Integrations</li>
            <li>Middleware Solutions for Efficient Communication</li>
            <li>Legacy System Integration with Modern Architectures</li>
            <li>Data Integration and ETL Pipelines</li>
        </ul>

        <h4>Security & Compliance</h4>
        <p>Security is a fundamental aspect of any architecture. We design systems with built-in security measures, ensuring compliance with industry standards and regulations.</p>
        <ul>
            <li>End-to-End Encryption for Data Security</li>
            <li>Role-Based Access Control (RBAC) and Identity Management</li>
            <li>Compliance with GDPR, HIPAA, SOC2, and Other Regulations</li>
            <li>Data Privacy and Secure API Design</li>
            <li>Continuous Security Audits and Penetration Testing</li>
        </ul>

        <h4>Scalability & Performance</h4>
        <p>Our architectural solutions are designed to scale seamlessly as your business grows, ensuring optimal performance and cost-efficiency at every stage.</p>
        <ul>
            <li>Auto-Scaling Architectures with Cloud Platforms</li>
            <li>Load Balancing and Performance Tuning</li>
            <li>Optimizing Latency and Throughput</li>
            <li>Cost-Effective Scaling with Serverless and Containerized Solutions</li>
            <li>Monitoring and Analytics for Continuous Improvement</li>
        </ul>

        <h2>Technologies We Use</h2>
        <ul>
            <li><strong>Cloud Platforms:</strong> AWS, GCP, Azure</li>
            <li><strong>Microservices Technologies:</strong> Docker, Kubernetes, Istio</li>
            <li><strong>API Management:</strong> WSO2 API Manager, Kong, Apigee</li>
            <li><strong>Databases:</strong> SQL, NoSQL, PostgreSQL, MongoDB</li>
            <li><strong>DevOps & Automation:</strong> Jenkins, Terraform, Ansible, CI/CD Pipelines</li>
            <li><strong>Security & Identity:</strong> OAuth, OpenID, Keycloak, SAML</li>
        </ul>
    `,
    },
    "post-implementation-support": {
    title: "Post-Implementation Support",
    content: `
        <p>We offer comprehensive post-implementation support to ensure that your solutions continue to operate smoothly, efficiently, and securely after deployment. Our support services are designed to keep your systems up-to-date, address issues promptly, and ensure your solutions meet evolving business needs.</p>

        <h4>Ongoing Maintenance & Monitoring</h4>
        <p>Our team provides continuous monitoring and proactive maintenance to ensure optimal system performance. We address issues before they impact your business, ensuring maximum uptime and smooth operation.</p>
        <ul>
            <li>24/7 System Monitoring for Early Issue Detection</li>
            <li>Performance Tuning and Optimization</li>
            <li>Proactive Patching and Security Updates</li>
            <li>Database and Infrastructure Health Checks</li>
            <li>Custom Alerts and Reporting</li>
        </ul>

        <h4>Bug Fixing and Issue Resolution</h4>
        <p>Our support services are designed to quickly identify and resolve any issues that arise in your production environment. Whether it’s a bug, performance issue, or system failure, we work tirelessly to ensure your systems remain reliable and efficient.</p>
        <ul>
            <li>Root Cause Analysis for Incident Management</li>
            <li>Swift Resolution of Bugs and System Failures</li>
            <li>Comprehensive Debugging and Issue Tracking</li>
            <li>Ensuring Minimal Disruption to Business Operations</li>
        </ul>

        <h4>System Upgrades & Enhancements</h4>
        <p>As your business evolves, so should your systems. We provide ongoing upgrades and enhancements to ensure your software remains up-to-date with new features, security patches, and performance improvements.</p>
        <ul>
            <li>Seamless Software Upgrades and Version Migration</li>
            <li>New Feature Implementation and Customization</li>
            <li>UI/UX Enhancements Based on User Feedback</li>
            <li>Integrating New Technologies and Solutions</li>
            <li>System Scalability Enhancements</li>
        </ul>

        <h4>Security & Compliance Support</h4>
        <p>We ensure that your systems remain secure and compliant with industry standards post-implementation. Our support includes continuous security audits, patch management, and compliance checks to ensure that your solution remains safe from vulnerabilities and adheres to regulatory requirements.</p>
        <ul>
            <li>Regular Security Audits and Penetration Testing</li>
            <li>Patch Management for Vulnerability Mitigation</li>
            <li>Compliance Checks with Industry Standards (GDPR, HIPAA, SOC2, etc.)</li>
            <li>Identity and Access Management Reviews</li>
            <li>Data Privacy and Security Remediation</li>
        </ul>

        <h4>Technical Support & Consultation</h4>
        <p>Our team is always available for technical assistance and consultation to help you navigate any challenges or adjustments required post-deployment. Whether it's troubleshooting or expanding your system capabilities, we offer the expertise you need.</p>
        <ul>
            <li>Responsive Technical Support and Issue Resolution</li>
            <li>Consultation for System Tweaks and Enhancements</li>
            <li>Advisory Services for System Scaling and Optimization</li>
            <li>Training for Your Internal Teams</li>
            <li>Best Practices for System Usage and Management</li>
        </ul>

        <h4>Service Level Agreements (SLA)</h4>
        <p>We offer tailored Service Level Agreements (SLAs) to match your business needs. Our SLAs ensure that you receive the appropriate level of support, with guaranteed response times and resolution targets to minimize any impact on your operations.</p>
        <ul>
            <li>Custom SLAs to Meet Your Business Needs</li>
            <li>Guaranteed Response and Resolution Times</li>
            <li>Dedicated Support Teams for Critical Issues</li>
            <li>Priority Support for Urgent Cases</li>
            <li>Regular Reporting and Performance Metrics</li>
        </ul>

        <h2>Technologies We Support</h2>
        <ul>
            <li><strong>Cloud Platforms:</strong> AWS, GCP, Azure</li>
            <li><strong>Containerized Environments:</strong> Docker, Kubernetes</li>
            <li><strong>Middleware Solutions:</strong> WSO2, MuleSoft, Apache Camel</li>
            <li><strong>API Management:</strong> WSO2 API Manager, Apigee, Kong</li>
            <li><strong>Databases:</strong> MySQL, PostgreSQL, MongoDB, Oracle</li>
            <li><strong>CI/CD Pipelines:</strong> Jenkins, GitLab CI, CircleCI</li>
            <li><strong>Security:</strong> OAuth, OpenID, SAML, Keycloak</li>
        </ul>
    `,
    }





    // Add similar details for other services...
};

function openServiceDetails(popupId) {
    document.getElementById(popupId).style.display = 'block';
}

function closeServiceDetails(popupId) {
    document.getElementById(popupId).style.display = 'none';
}

function scrollToContactUs() {
    // Scroll to the "Contact Us" section of the page
    document.getElementById('contactUsSection').scrollIntoView({ behavior: 'smooth' });
}

/*function showServiceDetails(serviceId) {
    const popup = document.getElementById("serviceDetailsPopup");
    const popupContent = document.getElementById("popupContent");

    if (serviceDetails[serviceId]) {
        popupContent.innerHTML = `
            <h2>${serviceDetails[serviceId].title}</h2>
            ${serviceDetails[serviceId].content}
        `;
        popup.style.display = "flex"; // Show the pop-up
    }
}

function closeServiceDetails() {
    const popup = document.getElementById("serviceDetailsPopup");
    popup.style.display = "none"; // Hide the pop-up
}*/

function openServiceDetails(popupId) {
    document.getElementById(popupId).style.display = 'block';
}

function closeServiceDetails(popupId) {
    document.getElementById(popupId).style.display = 'none';
}

function scrollToContactUs(popupId) {
    // Scroll to the Contact Us section smoothly
    closeServiceDetails(popupId);
    document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
}