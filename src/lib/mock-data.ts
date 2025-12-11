export type CostIncident = {
  id: string;
  title: string;
  severity: "low" | "medium" | "high";
  environment: "prod" | "staging" | "dev";
  workloadType: "k8s" | "ai-gpu" | "db" | "other";
  extraSpend: number;
  startTime: string;
  endTime: string;
  primaryServiceId: string;
  suspectedCause: string;
  sloImpactSummary: string;
  status: "open" | "resolved" | "ignored";
};

export type WhatIfScenario = {
  id: string;
  name: string;
  source?: "blank" | "incident" | "template";
  linkedIncidentId?: string;
  services: string[];
  environments: ("prod" | "staging" | "dev")[];
  configChanges: {
    cpuReductionPercent?: number;
    memoryReductionPercent?: number;
    useSpot?: boolean;
    scaleDownNight?: boolean;
  };
  estimatedMonthlySavings: number;
  riskLevel: "low" | "medium" | "high";
  createdAt: string;
};

export type SavingsPath = {
  id: string;
  name: string; // Safe, Balanced, Aggressive
  riskLevel: "low" | "medium" | "high";
  scenarioIds: string[];
  estimatedTotalSavings: number;
};

export type Team = {
  id: string;
  name: string;
  techLead: string;
  slackChannel: string;
  avatarColor: string;
};

export type Service = {
  id: string;
  name: string;
  teamId: string;
  tier: "tier-1" | "tier-2" | "tier-3";
  language: "go" | "python" | "node" | "rust";
  environment: "prod" | "staging" | "dev";
  monthlyCost: number;
  incidentsLast30d: number;
  potentialSavings: number;
};

// --- Mock Data ---

export const teams: Team[] = [
  {
    id: "team-ai",
    name: "AI Platform",
    techLead: "Sarah Chen",
    slackChannel: "#ai-platform",
    avatarColor: "bg-purple-500",
  },
  {
    id: "team-core",
    name: "Core Data",
    techLead: "Mike Ross",
    slackChannel: "#core-data",
    avatarColor: "bg-blue-500",
  },
  {
    id: "team-comm",
    name: "Commerce",
    techLead: "Priya Patel",
    slackChannel: "#commerce-dev",
    avatarColor: "bg-emerald-500",
  },
  {
    id: "team-tools",
    name: "Creative Tools",
    techLead: "Alex Kim",
    slackChannel: "#creative-tools",
    avatarColor: "bg-orange-500",
  },
];

export const services: Service[] = [
  {
    id: "svc-001",
    name: "llm-inference",
    teamId: "team-ai",
    tier: "tier-1",
    language: "python",
    environment: "prod",
    monthlyCost: 45000,
    incidentsLast30d: 3,
    potentialSavings: 12000,
  },
  {
    id: "svc-002",
    name: "vector-db",
    teamId: "team-core",
    tier: "tier-1",
    language: "rust",
    environment: "prod",
    monthlyCost: 18500,
    incidentsLast30d: 1,
    potentialSavings: 4000,
  },
  {
    id: "svc-003",
    name: "checkout-api",
    teamId: "team-comm",
    tier: "tier-1",
    language: "node",
    environment: "prod",
    monthlyCost: 8200,
    incidentsLast30d: 0,
    potentialSavings: 500,
  },
  {
    id: "svc-004",
    name: "image-gen-worker",
    teamId: "team-tools",
    tier: "tier-2",
    language: "python",
    environment: "staging",
    monthlyCost: 12000,
    incidentsLast30d: 5,
    potentialSavings: 8000,
  },
  {
    id: "svc-auth",
    name: "auth-service",
    teamId: "team-core",
    tier: "tier-1",
    language: "go",
    environment: "prod",
    monthlyCost: 240,
    incidentsLast30d: 0,
    potentialSavings: 50,
  },
  {
    id: "svc-gateway",
    name: "api-gateway",
    teamId: "team-core",
    tier: "tier-1",
    language: "go",
    environment: "prod",
    monthlyCost: 850,
    incidentsLast30d: 1,
    potentialSavings: 120,
  },
  {
    id: "svc-audit",
    name: "audit-logger",
    teamId: "team-tools",
    tier: "tier-3",
    language: "node",
    environment: "prod",
    monthlyCost: 1200,
    incidentsLast30d: 2,
    potentialSavings: 300,
  },
  {
    id: "svc-db",
    name: "user-db",
    teamId: "team-core",
    tier: "tier-1",
    language: "rust",
    environment: "prod",
    monthlyCost: 3400,
    incidentsLast30d: 0,
    potentialSavings: 800,
  },
];
// Stat Details Data
export interface StatDetail {
  id: string;
  title: string;
  value: string;
  subtext: string;
  trend?: "up" | "down";
  trendValue?: string;
  breakdown: { label: string; value: string; color: string }[];
  insights: string[];
  actionLabel: string;
}

export const statDetails: Record<string, StatDetail> = {
  "total-cloud-spend": {
    id: "total-cloud-spend",
    title: "Total Cloud Spend",
    value: "$124,380",
    subtext: "+12% vs previous 30 days",
    trend: "up",
    trendValue: "12%",
    breakdown: [
      { label: "Compute (EC2, GKE)", value: "$68,400", color: "bg-indigo-500" },
      { label: "Storage (S3, EBS)", value: "$24,100", color: "bg-blue-500" },
      { label: "Database (RDS)", value: "$18,500", color: "bg-emerald-500" },
      { label: "Networking", value: "$13,380", color: "bg-amber-500" },
    ],
    insights: [
      "Compute spend increased by 15% due to new LLM training jobs.",
      "Storage costs are stable.",
      "Networking spike detected in region us-east-1."
    ],
    actionLabel: "Analyze Compute Spend"
  },
  "k8s-ai-spend": {
    id: "k8s-ai-spend",
    title: "K8s + AI Spend",
    value: "$76,420",
    subtext: "61% of total spend",
    trend: "up",
    trendValue: "4%",
    breakdown: [
      { label: "GPU Clusters (A100s)", value: "$45,200", color: "bg-rose-500" },
      { label: "Standard K8s Nodes", value: "$22,100", color: "bg-indigo-500" },
      { label: "Spot Instances", value: "$9,120", color: "bg-purple-500" },
    ],
    insights: [
      "GPU urgency is high; 20% of GPU hours are idle.",
      "Spot instance usage increased, saving ~$4k this month."
    ],
    actionLabel: "Optimize GPU Usage"
  },
  "active-incidents": {
    id: "active-incidents",
    title: "Active Incidents",
    value: "3",
    subtext: "1 high impact detected",
    trend: "up",
    trendValue: "+2",
    breakdown: [
      { label: "High Severity", value: "1", color: "bg-rose-500" },
      { label: "Medium Severity", value: "2", color: "bg-amber-500" },
      { label: "Low Severity", value: "0", color: "bg-emerald-500" },
    ],
    insights: [
      "Critical incident on llm-inference service driving costs up.",
      "2 warnings on storage limits."
    ],
    actionLabel: "View Incidents"
  },
  "potential-savings": {
    id: "potential-savings",
    title: "Potential Savings",
    value: "$18,200",
    subtext: "Safe to implement now",
    trend: "down",
    trendValue: "Reliability Safe",
    breakdown: [
      { label: "Idle Resources", value: "$8,500", color: "bg-emerald-500" },
      { label: "Over-provisioned", value: "$6,200", color: "bg-blue-500" },
      { label: "Spot Opportunities", value: "$3,500", color: "bg-amber-500" },
    ],
    insights: [
      "Biggest opportunity: Downsize 15 oversized RDS instances.",
      "Deleting unattached EBS volumes saves $1.2k immediately."
    ],
    actionLabel: "Apply All Savings"
  }
};
// Savings Details Data
export interface SavingsPathDetail {
  id: string;
  title: string;
  riskLevel: "low" | "medium" | "high";
  potentialSavings: string;
  description: string;
  actions: { 
    id: string; 
    type: string; 
    impact: string; 
    risk: string;
    description: string;
    simulationSteps?: string[]; 
  }[];
  implementationTime: string;
  autoFixAvailable: boolean;
}

export const savingsDetails: Record<string, SavingsPathDetail> = {
  "path-safe": {
    id: "path-safe",
    title: "Safe",
    riskLevel: "low",
    potentialSavings: "$18,200",
    description: "Low-risk optimizations that do not affect application performance or availability.",
    actions: [
      { 
        id: "s1", 
        type: "Storage Cleanup", 
        impact: "$4,200/mo", 
        risk: "Low",
        description: "Delete unattached EBS volumes older than 30 days.",
        simulationSteps: ["Scanning region us-east-1 for orphaned volumes...", "Identified 4 unattached volumes (Total 500GB)", "Creating final snapshot 'snap-cleanup-2025'...", "Deleting volume vol-0a1b2c3d...", "Deleting volume vol-0e5f6g7h...", "Storage cleanup complete."]
      },
      { 
        id: "s2", 
        type: "Rightsizing", 
        impact: "$8,500/mo", 
        risk: "Low",
        description: "Downsize RDS instances with <5% CPU utilization.",
        simulationSteps: ["Analyzing RDS metrics (30d history)...", "Detected 'db-staging-01' at 2% avg utilization", "Calculating rightsizing target (db.r5.xlarge -> db.r5.large)...", "Verifying connection pool capacity...", "Applying modification (Maintenance Window: Immediate)...", "Instance resizing initiated."]
      },
      { 
        id: "s3", 
        type: "Reserved Instances", 
        impact: "$5,500/mo", 
        risk: "Low",
        description: "Purchase RIs for steady-state production workloads.",
        simulationSteps: ["Evaluating EC2 usage patterns...", "Identified 12 steady-state m5.large instances", "Comparing Standard vs Convertible RI pricing...", "Generating quote for 1-year All Upfront RI...", "Processing purchase order PO-2938...", "RIs successfully applied to account."]
      }
    ],
    implementationTime: "Immediate",
    autoFixAvailable: true
  },
  "path-balanced": {
    id: "path-balanced",
    title: "Balanced",
    riskLevel: "medium",
    potentialSavings: "$28,500",
    description: "Moderate changes involving spot instances and some architectural tweaks.",
    actions: [
      { 
        id: "b1", 
        type: "Spot Instances", 
        impact: "$12,000/mo", 
        risk: "Medium",
        description: "Migrate stateless staging microservices to Spot instances.",
        simulationSteps: ["Identifying stateless candidates in 'staging'...", "Found 'image-worker', 'log-processor'", "Creating Spot Fleet Request config...", "Setting max price to on-demand -50%...", "Updating Auto Scaling Group launch template...", "Rolling out replacement instances..."]
      },
      { 
        id: "b2", 
        type: "Life-cycle Policy", 
        impact: "$6,500/mo", 
        risk: "Low",
        description: "Move S3 objects >90 days old to Glacier Deep Archive.",
        simulationSteps: ["Scanning bucket 'app-logs-archive'...", "Found 1.2M objects eligible for transition", "Defining S3 Lifecycle Rule 'Archive-Old-Logs'...", "Applying transition policy (Standard -> Glacier DA)...", "Policy active. estimated transition time: 24h."]
      },
       { 
        id: "b3", 
        type: "Nat Gateway", 
        impact: "$10,000/mo", 
        risk: "Medium",
        description: "Consolidate NAT Gateways to reduce data processing fees.",
        simulationSteps: ["Mapping VPC alignment...", "Identified redundant NATGW in az-1b", "Updating route tables for subnet-private-b...", "Rerouting traffic to NATGW-main...", "Verifying connectivity...", "Decommissioning redundant NAT Gateway."]
      }
    ],
    implementationTime: "1-2 Weeks",
    autoFixAvailable: false
  },
  "path-aggressive": {
    id: "path-aggressive",
    title: "Aggressive",
    riskLevel: "high",
    potentialSavings: "$41,500",
    description: "High-impact changes that may require application refactoring or reduced redundancy.",
    actions: [
      { 
        id: "a1", 
        type: "Architecture", 
        impact: "$20,000/mo", 
        risk: "High",
        description: "Migrate legacy EC2 monoliths to Lambda/Serverless.",
        simulationSteps: ["Analyzing 'legacy-api' code dependencies...", "Generating Docker container for migration...", "Provisioning AWS Lambda function...", "Creating API Gateway endpoints...", "Migrating traffic (Canary 10%)...", "Migration roadmap generated."]
      },
      { 
        id: "a2", 
        type: "Dev Environments", 
        impact: "$11,500/mo", 
        risk: "Medium",
        description: "Auto-shutdown all non-prod envs on nights/weekends.",
        simulationSteps: ["Tagging dev/test resources for 'InstanceScheduler'...", "Configuring schedule: M-F 08:00-19:00", "Deploying AWS Instance Scheduler stack...", "Testing stop/start sequence on 'dev-worker'...", "Schedule active."]
      },
      { 
        id: "a3", 
        type: "Database", 
        impact: "$10,000/mo", 
        risk: "High",
        description: "Migrate Aurora to DynamoDB for specific high-throughput tables.",
        simulationSteps: ["Analyzing 'session_store' table access patterns...", "Designing DynamoDB schema (PK: session_id)...", "Starting DMS (Database Migration Service) task...", "Replicating data...", "Verifying data integrity...", "Migration complete."]
      }
    ],
    implementationTime: "1 Month+",
    autoFixAvailable: false
  }
};

export const costIncidents: CostIncident[] = [
  {
    id: "CI-023",
    title: "GPU spike on llm-inference",
    severity: "high",
    environment: "prod",
    workloadType: "ai-gpu",
    extraSpend: 3420,
    startTime: "2025-12-10T10:00:00Z",
    endTime: "2025-12-10T10:42:00Z",
    primaryServiceId: "svc-001",
    suspectedCause: "Autoscaler added 8 GPU nodes during minor load spike",
    sloImpactSummary: "Error budget burn +4%",
    status: "open",
  },
  {
    id: "CI-024",
    title: "Unused storage volumes",
    severity: "low",
    environment: "dev",
    workloadType: "k8s",
    extraSpend: 450,
    startTime: "2025-12-08T09:00:00Z",
    endTime: "2025-12-11T12:00:00Z",
    primaryServiceId: "svc-004",
    suspectedCause: "Orphaned PVCs after deployment failure",
    sloImpactSummary: "None",
    status: "ignored",
  },
  {
    id: "CI-022",
    title: "High Memory usage in Catalog",
    severity: "medium",
    environment: "prod",
    workloadType: "k8s",
    extraSpend: 1200,
    startTime: "2025-12-05T14:30:00Z",
    endTime: "2025-12-05T18:00:00Z",
    primaryServiceId: "svc-003",
    suspectedCause: "Memory leak in v2.4.1",
    sloImpactSummary: "Latency p99 increased by 200ms",
    status: "resolved",
  },
  {
    id: "CI-025",
    title: "Unintended Egress Spike",
    severity: "medium",
    environment: "prod",
    workloadType: "k8s",
    extraSpend: 890,
    startTime: "2025-12-11T08:15:00Z",
    endTime: "2025-12-11T11:00:00Z",
    primaryServiceId: "svc-002",
    suspectedCause: "Database backup job misconfigured to cross-region bucket",
    sloImpactSummary: "None",
    status: "open",
  },
  {
    id: "CI-026",
    title: "Zombie Load Balancers",
    severity: "low",
    environment: "staging",
    workloadType: "other",
    extraSpend: 150,
    startTime: "2025-12-01T00:00:00Z",
    endTime: "2025-12-11T12:00:00Z",
    primaryServiceId: "svc-004",
    suspectedCause: "Deleted service without cleaning up LBs",
    sloImpactSummary: "None",
    status: "open",
  },
  {
    id: "CI-027",
    title: "Spot Instance Mass Preemption",
    severity: "high",
    environment: "prod",
    workloadType: "ai-gpu",
    extraSpend: 2100,
    startTime: "2025-12-10T22:00:00Z",
    endTime: "2025-12-10T23:30:00Z",
    primaryServiceId: "svc-001",
    suspectedCause: "Region-wide spot capacity shortage, fell back to On-Demand",
    sloImpactSummary: "Inference latency +500ms",
    status: "resolved",
  },
];

export const savingsPaths: SavingsPath[] = [
  {
    id: "path-safe",
    name: "Safe",
    riskLevel: "low",
    scenarioIds: ["scen-001", "scen-002"],
    estimatedTotalSavings: 18200,
  },
  {
    id: "path-balanced",
    name: "Balanced",
    riskLevel: "medium",
    scenarioIds: ["scen-003", "scen-004"],
    estimatedTotalSavings: 28500,
  },
  {
    id: "path-aggressive",
    name: "Aggressive",
    riskLevel: "high",
    scenarioIds: ["scen-005"],
    estimatedTotalSavings: 41500,
  },
];

export const scenarios: WhatIfScenario[] = [
  {
    id: "scen-001",
    name: "Right-size llm-inference requests",
    source: "template",
    services: ["svc-001"],
    environments: ["prod"],
    configChanges: {
      cpuReductionPercent: 20,
      memoryReductionPercent: 10,
    },
    estimatedMonthlySavings: 8500,
    riskLevel: "low",
    createdAt: "2025-12-01T10:00:00Z",
  },
  {
    id: "scen-003",
    name: "Use Spot for image-gen-worker",
    source: "blank",
    services: ["svc-004"],
    environments: ["staging"],
    configChanges: {
      useSpot: true,
    },
    estimatedMonthlySavings: 6000,
    riskLevel: "medium",
    createdAt: "2025-12-05T14:00:00Z",
  },
];
