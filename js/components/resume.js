// Resume component
function renderResumeSection() {
    return `
        <div class="section-content">
            <h2 class="section-title">Professional Resume</h2>
            <div class="resume-content">
                <div class="resume-section">
                    <h3>Professional Experience</h3>
                    <div class="experience-item">
                        <h4>Software Support Engineer L2</h4>
                        <p class="company">Derivco (PTY) LTD</p>
                        <p class="period">2013 - 2025</p>
                        <ul>
                            <li>Support our operators through proactive monitoring and automation while managing tickets logged via a CRM system and Pager Duty</li>
                            <li>Deployed features to production via Azure & Octopus with zero downtime rollouts</li>
                            <li>Automated and documented routine tasks using PowerShell and Bash scripting to save many man hours, allowing us to focus on higher value engineering tasks an proactive system improvements</li>
                            <li>Supported Windows Servers, Linux systems, SQL databases, RabbitMQ and Kafka</li>
                            <li>Responded to Kibana/Grafana-triggered alerts via Pager Duty as well as custom email alerting</li>
                        </ul>
                    </div>
                    <div class="experience-item">
                        <h4>Desktop Engineer</h4>
                        <p class="company">Seaboard Overseas Trading</p>
                        <p class="period">2010 - 2013</p>
                        <ul>
                            <li>Delivered first-line support to 50+ end-users</li>
                            <li>Managed hardware/software rollouts and updates</li>
                            <li>Supported remote connectivity for international teams</li>
                        </ul>
                    </div>
                </div>

                <div class="resume-section">
                    <h3>Technical Skills</h3>
                    <div class="skills-grid">
                        <div class="skill-category">
                            <h4>Operating Systems</h4>
                            <ul>
                                <li>Windows Server, Linux (Ubuntu, CentOS)</li>
                            </ul>
                        </div>
                        <div class="skill-category">
                            <h4>Cloud & Virtualization</h4>
                            <ul>
                                <li>Azure (AZ-900, AZ-104), VMware vCenter, ESXi, vCloud</li>
                            </ul>
                        </div>
                        <div class="skill-category">
                            <h4>DevOps & Tools</h4>
                            <ul>
                                <li>Octopus Deploy, PowerShell,</li>
                                <li>Docker, Kubernetes, Git</li>
                            </ul>
                        </div>
                        <div class="skill-category">
                            <h4>Monitoring & Messaging</h4>
                            <ul>
                                <li>Kafka, RabbitMQ, Kibana, Grafana</li>
                            </ul>
                        </div>
                        <div class="skill-category">
                            <h4>Databases</h4>
                            <ul>
                                <li>SQL Server, MySQL, MongoDB, KSQL</li>
                            </ul>
                        </div>
                        <div class="skill-category">
                            <h4>Scripting & Automation</h4>
                            <ul>
                                <li>PowerShell, Bash, Python</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div class="resume-download">
                    <a href="./attached_assets/Michael Georgiades CV.pdf"
                       download="Michael_Georgiades_Resume.pdf"
                       class="btn btn-primary">
                        Download PDF Resume
                    </a>
                </div>
            </div>
        </div>
    `;
}
