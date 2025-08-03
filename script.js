// Dados das máquinas (agora editáveis)
let machinesData = [
  {
    id: 1,
    name: "Linha de Produção A",
    status: "operational",
    efficiency: 94,
    production: 1250,
    target: 1300,
    temperature: 68,
    vibration: "Normal",
    lastMaintenance: "2024-01-15",
    description: "Linha principal de montagem com alta capacidade de produção",
    specifications: {
      power: "150 kW",
      speed: "120 RPM",
      capacity: "1300 unidades/dia",
    },
  },
  {
    id: 2,
    name: "Linha de Produção B",
    status: "warning",
    efficiency: 78,
    production: 980,
    target: 1200,
    temperature: 75,
    vibration: "Elevada",
    lastMaintenance: "2024-01-10",
    description: "Linha secundária com sistema de controle automatizado",
    specifications: {
      power: "120 kW",
      speed: "100 RPM",
      capacity: "1200 unidades/dia",
    },
  },
  {
    id: 3,
    name: "Linha de Produção C",
    status: "operational",
    efficiency: 91,
    production: 1180,
    target: 1250,
    temperature: 70,
    vibration: "Normal",
    lastMaintenance: "2024-01-18",
    description: "Linha de acabamento com tecnologia de precisão",
    specifications: {
      power: "100 kW",
      speed: "90 RPM",
      capacity: "1250 unidades/dia",
    },
  },
  {
    id: 4,
    name: "Linha de Produção D",
    status: "maintenance",
    efficiency: 0,
    production: 0,
    target: 1100,
    temperature: 25,
    vibration: "Parada",
    lastMaintenance: "2024-01-20",
    description: "Linha de embalagem em manutenção preventiva",
    specifications: {
      power: "80 kW",
      speed: "80 RPM",
      capacity: "1100 unidades/dia",
    },
  },
]

// Configurações do sistema
let systemSettings = {
  criticalTemp: 75,
  minEfficiency: 70,
  soundAlerts: true,
  autoUpdate: true,
}

// Estado do modo de edição
let editMode = false

// Usuário atual
const currentUser = {
  name: "Operador",
  role: "Operador",
}

// Função para carregar dados do usuário
function loadUserData() {
  const userData = localStorage.getItem("currentUser")
  if (userData) {
    const user = JSON.parse(userData)
    currentUser.name = user.username || "Usuário"
    currentUser.role = user.role || "Operador"
  }

  document.getElementById("currentUserName").textContent = currentUser.name
  document.getElementById("currentUserRole").textContent = currentUser.role
}

// Função para atualizar data e hora
function updateDateTime() {
  const now = new Date()
  const dateElement = document.getElementById("current-date")
  const timeElement = document.getElementById("current-time")

  if (dateElement && timeElement) {
    dateElement.textContent = now.toLocaleDateString("pt-BR")
    timeElement.textContent = now.toLocaleTimeString("pt-BR")
  }
}

// Função para calcular KPIs
function updateKPIs() {
  const totalProduction = machinesData.reduce((sum, machine) => sum + machine.production, 0)
  const averageEfficiency = Math.round(
    machinesData.reduce((sum, machine) => sum + machine.efficiency, 0) / machinesData.length,
  )
  const activeMachines = machinesData.filter((m) => m.status === "operational").length

  document.getElementById("total-production").textContent = totalProduction.toLocaleString()
  document.getElementById("average-efficiency").textContent = averageEfficiency + "%"
  document.getElementById("active-machines").textContent = `${activeMachines}/4`
}

// Função para obter texto do status
function getStatusText(status) {
  switch (status) {
    case "operational":
      return "Operacional"
    case "warning":
      return "Atenção"
    case "maintenance":
      return "Manutenção"
    default:
      return "Desconhecido"
  }
}

// Função para criar card de máquina
function createMachineCard(machine) {
  return `
        <div class="machine-card" data-editable="machine" data-machine-id="${machine.id}">
            <button class="edit-btn" data-edit-type="machine" data-machine-id="${machine.id}">
                <i class="fas fa-edit"></i>
            </button>
            <div class="machine-header">
                <h3 class="machine-title">${machine.name}</h3>
                <div class="machine-status">
                    <div class="status-light ${machine.status}"></div>
                    <span class="status-badge ${machine.status}">${getStatusText(machine.status)}</span>
                </div>
            </div>
            
            <div class="machine-metrics">
                <div class="metric">
                    <div class="metric-label">Eficiência</div>
                    <div class="metric-value">
                        ${machine.efficiency}%
                        <i class="fas fa-tachometer-alt metric-icon"></i>
                    </div>
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: ${machine.efficiency}%"></div>
                    </div>
                </div>
                
                <div class="metric">
                    <div class="metric-label">Produção</div>
                    <div class="metric-value">
                        ${machine.production}
                        <i class="fas fa-industry metric-icon"></i>
                    </div>
                    <div class="metric-label" style="font-size: 0.75rem; margin-top: 0.25rem;">
                        Meta: ${machine.target}
                    </div>
                </div>
            </div>
            
            <div class="machine-details">
                <div class="detail-item">
                    <div class="detail-label">Temp.</div>
                    <div class="detail-value">${machine.temperature}°C</div>
                </div>
                <div class="detail-item">
                    <div class="detail-label">Vibração</div>
                    <div class="detail-value">${machine.vibration}</div>
                </div>
                <div class="detail-item">
                    <div class="detail-label">Manutenção</div>
                    <div class="detail-value" style="font-size: 0.75rem;">${machine.lastMaintenance}</div>
                </div>
            </div>
        </div>
    `
}

// Função para criar página detalhada da máquina
function createMachineDetailPage(machine) {
  const efficiencyAngle = (machine.efficiency / 100) * 360
  const productionPercentage = machine.target > 0 ? (machine.production / machine.target) * 100 : 0

  return `
        <div class="machine-detail-header">
            <h1 class="machine-detail-title">${machine.name}</h1>
            <p class="machine-detail-subtitle">${machine.description}</p>
            <div class="machine-status-badge ${machine.status}">
                <div class="status-light ${machine.status}"></div>
                ${getStatusText(machine.status)}
            </div>
        </div>
        
        <div class="machine-detail-content">
            <div class="machine-metrics-grid">
                <div class="metric-card" data-editable="metric" data-metric="efficiency" data-machine-id="${machine.id}">
                    <button class="edit-btn" data-edit-type="metric" data-metric="efficiency" data-machine-id="${machine.id}">
                        <i class="fas fa-edit"></i>
                    </button>
                    <i class="fas fa-tachometer-alt metric-icon"></i>
                    <div class="metric-value">${machine.efficiency}%</div>
                    <div class="metric-label">Eficiência Atual</div>
                </div>
                
                <div class="metric-card" data-editable="metric" data-metric="production" data-machine-id="${machine.id}">
                    <button class="edit-btn" data-edit-type="metric" data-metric="production" data-machine-id="${machine.id}">
                        <i class="fas fa-edit"></i>
                    </button>
                    <i class="fas fa-industry metric-icon"></i>
                    <div class="metric-value">${machine.production}</div>
                    <div class="metric-label">Produção Hoje</div>
                </div>
                
                <div class="metric-card" data-editable="metric" data-metric="temperature" data-machine-id="${machine.id}">
                    <button class="edit-btn" data-edit-type="metric" data-metric="temperature" data-machine-id="${machine.id}">
                        <i class="fas fa-edit"></i>
                    </button>
                    <i class="fas fa-thermometer-half metric-icon"></i>
                    <div class="metric-value">${machine.temperature}°C</div>
                    <div class="metric-label">Temperatura</div>
                </div>
                
                <div class="metric-card" data-editable="metric" data-metric="vibration" data-machine-id="${machine.id}">
                    <button class="edit-btn" data-edit-type="metric" data-metric="vibration" data-machine-id="${machine.id}">
                        <i class="fas fa-edit"></i>
                    </button>
                    <i class="fas fa-wave-square metric-icon"></i>
                    <div class="metric-value">${machine.vibration}</div>
                    <div class="metric-label">Vibração</div>
                </div>
            </div>
            
            <div class="machine-charts">
                <div class="chart-card">
                    <h3 class="chart-title">Eficiência</h3>
                    <div class="efficiency-gauge">
                        <div class="gauge-circle" style="--efficiency-angle: ${efficiencyAngle}deg;">
                            <div class="gauge-value">${machine.efficiency}%</div>
                        </div>
                    </div>
                </div>
                
                <div class="chart-card">
                    <h3 class="chart-title">Produção vs Meta</h3>
                    <div class="production-bar">
                        <div class="production-fill" style="width: ${productionPercentage}%;">
                            <div class="production-text">${machine.production} / ${machine.target}</div>
                        </div>
                    </div>
                    <p style="text-align: center; margin-top: 1rem; color: #64748b;">
                        ${Math.round(productionPercentage)}% da meta diária
                    </p>
                </div>
            </div>
            
            <div class="chart-card" style="margin-top: 1.5rem;" data-editable="specs" data-machine-id="${machine.id}">
                <button class="edit-btn" data-edit-type="specs" data-machine-id="${machine.id}">
                    <i class="fas fa-edit"></i>
                </button>
                <h3 class="chart-title">Especificações Técnicas</h3>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; margin-top: 1rem;">
                    <div style="text-align: center; padding: 1rem; background: white; border-radius: 0.5rem; border: 1px solid #e2e8f0;">
                        <i class="fas fa-bolt" style="font-size: 1.5rem; color: #f59e0b; margin-bottom: 0.5rem;"></i>
                        <div style="font-size: 1.25rem; font-weight: 600; color: #1e293b;">${machine.specifications.power}</div>
                        <div style="font-size: 0.875rem; color: #64748b;">Potência</div>
                    </div>
                    <div style="text-align: center; padding: 1rem; background: white; border-radius: 0.5rem; border: 1px solid #e2e8f0;">
                        <i class="fas fa-sync-alt" style="font-size: 1.5rem; color: #3b82f6; margin-bottom: 0.5rem;"></i>
                        <div style="font-size: 1.25rem; font-weight: 600; color: #1e293b;">${machine.specifications.speed}</div>
                        <div style="font-size: 0.875rem; color: #64748b;">Velocidade</div>
                    </div>
                    <div style="text-align: center; padding: 1rem; background: white; border-radius: 0.5rem; border: 1px solid #e2e8f0;">
                        <i class="fas fa-boxes" style="font-size: 1.5rem; color: #10b981; margin-bottom: 0.5rem;"></i>
                        <div style="font-size: 1.25rem; font-weight: 600; color: #1e293b;">${machine.specifications.capacity}</div>
                        <div style="font-size: 0.875rem; color: #64748b;">Capacidade</div>
                    </div>
                </div>
            </div>
        </div>
    `
}

// Função para renderizar configurações das máquinas
function renderMachineSettings() {
  const container = document.getElementById("machines-settings")
  if (container) {
    container.innerHTML = machinesData
      .map(
        (machine) => `
            <div class="machine-setting">
                <div class="machine-setting-header">
                    <div class="machine-setting-title">
                        <i class="fas fa-cog"></i>
                        ${machine.name}
                    </div>
                </div>
                <div class="machine-setting-fields">
                    <div class="setting-item">
                        <label>Nome da Máquina:</label>
                        <input type="text" value="${machine.name}" data-machine-id="${machine.id}" data-field="name" class="setting-input machine-field">
                    </div>
                    <div class="setting-item">
                        <label>Status:</label>
                        <select data-machine-id="${machine.id}" data-field="status" class="setting-select machine-field">
                            <option value="operational" ${machine.status === "operational" ? "selected" : ""}>Operacional</option>
                            <option value="warning" ${machine.status === "warning" ? "selected" : ""}>Atenção</option>
                            <option value="maintenance" ${machine.status === "maintenance" ? "selected" : ""}>Manutenção</option>
                        </select>
                    </div>
                    <div class="setting-item">
                        <label>Meta de Produção:</label>
                        <input type="number" value="${machine.target}" data-machine-id="${machine.id}" data-field="target" class="setting-input machine-field">
                    </div>
                    <div class="setting-item">
                        <label>Descrição:</label>
                        <input type="text" value="${machine.description}" data-machine-id="${machine.id}" data-field="description" class="setting-input machine-field">
                    </div>
                    <div class="setting-item">
                        <label>Potência:</label>
                        <input type="text" value="${machine.specifications.power}" data-machine-id="${machine.id}" data-field="power" class="setting-input machine-field">
                    </div>
                    <div class="setting-item">
                        <label>Velocidade:</label>
                        <input type="text" value="${machine.specifications.speed}" data-machine-id="${machine.id}" data-field="speed" class="setting-input machine-field">
                    </div>
                    <div class="setting-item">
                        <label>Capacidade:</label>
                        <input type="text" value="${machine.specifications.capacity}" data-machine-id="${machine.id}" data-field="capacity" class="setting-input machine-field">
                    </div>
                </div>
            </div>
        `,
      )
      .join("")
  }
}

// Função para renderizar máquinas
function renderMachines() {
  const container = document.getElementById("machines-container")
  if (container) {
    container.innerHTML = machinesData.map((machine) => createMachineCard(machine)).join("")
  }
}

// Função para renderizar páginas detalhadas das máquinas
function renderMachineDetails() {
  machinesData.forEach((machine) => {
    const container = document.getElementById(`machine-${machine.id}-detail`)
    if (container) {
      container.innerHTML = createMachineDetailPage(machine)
    }
  })
}

// Função para renderizar sensores de temperatura
function renderTemperatureSensors() {
  const container = document.getElementById("temperature-sensors")
  if (container) {
    container.innerHTML = machinesData
      .map(
        (machine) => `
            <div class="sensor-item">
                <span class="sensor-name">${machine.name}</span>
                <span class="sensor-value ${machine.temperature > systemSettings.criticalTemp ? "status-badge maintenance" : "status-badge operational"}">
                    ${machine.temperature}°C
                </span>
            </div>
        `,
      )
      .join("")
  }
}

// Função para renderizar sensores de vibração
function renderVibrationSensors() {
  const container = document.getElementById("vibration-sensors")
  if (container) {
    container.innerHTML = machinesData
      .map((machine) => {
        let statusClass = "operational"
        if (machine.vibration === "Elevada") statusClass = "maintenance"
        else if (machine.vibration === "Parada") statusClass = "warning"

        return `
                <div class="sensor-item">
                    <span class="sensor-name">${machine.name}</span>
                    <span class="sensor-value status-badge ${statusClass}">
                        ${machine.vibration}
                    </span>
                </div>
            `
      })
      .join("")
  }
}

// Função para renderizar alertas
function renderAlerts() {
  const container = document.getElementById("active-alerts")
  if (container) {
    const alerts = []

    machinesData.forEach((machine) => {
      if (machine.vibration === "Elevada") {
        alerts.push({
          type: "warning",
          message: `${machine.name} - Vibração elevada`,
        })
      }
      if (machine.status === "maintenance") {
        alerts.push({
          type: "danger",
          message: `${machine.name} - Em manutenção`,
        })
      }
      if (machine.temperature > systemSettings.criticalTemp) {
        alerts.push({
          type: "danger",
          message: `${machine.name} - Temperatura crítica`,
        })
      }
      if (machine.efficiency < systemSettings.minEfficiency) {
        alerts.push({
          type: "warning",
          message: `${machine.name} - Eficiência baixa`,
        })
      }
    })

    container.innerHTML = alerts
      .map(
        (alert) => `
            <div class="alert-item ${alert.type}">
                <i class="fas fa-exclamation-triangle"></i>
                <span>${alert.message}</span>
            </div>
        `,
      )
      .join("")
  }
}

// Função para renderizar gráfico de eficiência
function renderEfficiencyChart() {
  const container = document.getElementById("efficiency-chart")
  if (container) {
    container.innerHTML = machinesData
      .map(
        (machine) => `
            <div class="progress-item">
                <div class="progress-header">
                    <span class="progress-name">${machine.name}</span>
                    <span class="progress-value">${machine.efficiency}%</span>
                </div>
                <div class="progress-bar">
                    <div class="progress-fill" style="width: ${machine.efficiency}%"></div>
                </div>
            </div>
        `,
      )
      .join("")
  }
}

// Função para renderizar gráfico de produção
function renderProductionChart() {
  const container = document.getElementById("production-chart")
  if (container) {
    container.innerHTML = machinesData
      .map((machine) => {
        const percentage = machine.target > 0 ? (machine.production / machine.target) * 100 : 0
        return `
                <div class="progress-item">
                    <div class="progress-header">
                        <span class="progress-name">${machine.name}</span>
                        <span class="progress-value">${machine.production}/${machine.target}</span>
                    </div>
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: ${percentage}%"></div>
                    </div>
                </div>
            `
      })
      .join("")
  }
}

// Função para gerenciar tabs
function initializeTabs() {
  const tabButtons = document.querySelectorAll(".tab-btn")
  const tabContents = document.querySelectorAll(".tab-content")

  tabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const targetTab = button.getAttribute("data-tab")

      tabButtons.forEach((btn) => btn.classList.remove("active"))
      tabContents.forEach((content) => content.classList.remove("active"))

      button.classList.add("active")
      document.getElementById(`${targetTab}-tab`).classList.add("active")
    })
  })
}

// Função para gerenciar navegação entre páginas
function initializeNavigation() {
  const navItems = document.querySelectorAll(".nav-item")
  const pages = document.querySelectorAll(".page")

  navItems.forEach((item) => {
    item.addEventListener("click", (e) => {
      e.preventDefault()
      const targetPage = item.getAttribute("data-page")

      navItems.forEach((nav) => nav.classList.remove("active"))
      pages.forEach((page) => page.classList.remove("active"))

      item.classList.add("active")
      document.getElementById(`${targetPage}-page`).classList.add("active")
    })
  })
}

// Função para gerenciar sidebar
function initializeSidebar() {
  const sidebarToggle = document.getElementById("sidebar-toggle")
  const sidebar = document.getElementById("sidebar")

  sidebarToggle.addEventListener("click", () => {
    sidebar.classList.toggle("open")
  })

  document.addEventListener("click", (e) => {
    if (window.innerWidth <= 1024) {
      if (!sidebar.contains(e.target) && !sidebarToggle.contains(e.target)) {
        sidebar.classList.remove("open")
      }
    }
  })
}

// Função para gerenciar modo de edição
function initializeEditMode() {
  const editModeBtn = document.getElementById("editModeBtn")

  editModeBtn.addEventListener("click", () => {
    editMode = !editMode
    document.body.classList.toggle("edit-mode", editMode)

    if (editMode) {
      editModeBtn.classList.add("active")
      editModeBtn.innerHTML = '<i class="fas fa-times"></i><span>Sair da Edição</span>'
      showAlert("info", "Modo Edição Ativo", "Clique nos elementos para editá-los")
    } else {
      editModeBtn.classList.remove("active")
      editModeBtn.innerHTML = '<i class="fas fa-edit"></i><span>Modo Edição</span>'
      showAlert("success", "Modo Edição Desativado", "Alterações salvas automaticamente")
    }
  })
}

// Função para abrir modal de edição
function openEditModal(type, data) {
  const modal = document.getElementById("editModal")
  const modalTitle = document.getElementById("modalTitle")
  const modalBody = document.getElementById("modalBody")

  let title = ""
  let content = ""

  switch (type) {
    case "machine":
      const machine = machinesData.find((m) => m.id == data.machineId)
      title = `Editar ${machine.name}`
      content = `
                <div class="modal-form">
                    <div class="form-group">
                        <label>Nome da Máquina:</label>
                        <input type="text" id="edit-name" value="${machine.name}">
                    </div>
                    <div class="form-group">
                        <label>Status:</label>
                        <select id="edit-status">
                            <option value="operational" ${machine.status === "operational" ? "selected" : ""}>Operacional</option>
                            <option value="warning" ${machine.status === "warning" ? "selected" : ""}>Atenção</option>
                            <option value="maintenance" ${machine.status === "maintenance" ? "selected" : ""}>Manutenção</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Descrição:</label>
                        <textarea id="edit-description">${machine.description}</textarea>
                    </div>
                    <div class="form-group">
                        <label>Meta de Produção:</label>
                        <input type="number" id="edit-target" value="${machine.target}">
                    </div>
                </div>
            `
      break

    case "metric":
      const metricMachine = machinesData.find((m) => m.id == data.machineId)
      const metricName = data.metric
      const currentValue = metricMachine[metricName]

      title = `Editar ${metricName} - ${metricMachine.name}`
      content = `
                <div class="modal-form">
                    <div class="form-group">
                        <label>${metricName.charAt(0).toUpperCase() + metricName.slice(1)}:</label>
                        <input type="${metricName === "vibration" ? "text" : "number"}" id="edit-metric-value" value="${currentValue}">
                    </div>
                </div>
            `
      break

    case "specs":
      const specsMachine = machinesData.find((m) => m.id == data.machineId)
      title = `Editar Especificações - ${specsMachine.name}`
      content = `
                <div class="modal-form">
                    <div class="form-group">
                        <label>Potência:</label>
                        <input type="text" id="edit-power" value="${specsMachine.specifications.power}">
                    </div>
                    <div class="form-group">
                        <label>Velocidade:</label>
                        <input type="text" id="edit-speed" value="${specsMachine.specifications.speed}">
                    </div>
                    <div class="form-group">
                        <label>Capacidade:</label>
                        <input type="text" id="edit-capacity" value="${specsMachine.specifications.capacity}">
                    </div>
                </div>
            `
      break
  }

  modalTitle.textContent = title
  modalBody.innerHTML = content
  modal.classList.add("active")

  // Salvar dados no modal para uso posterior
  modal.dataset.editType = type
  modal.dataset.editData = JSON.stringify(data)
}

// Função para salvar edições
function saveEdit() {
  const modal = document.getElementById("editModal")
  const editType = modal.dataset.editType
  const editData = JSON.parse(modal.dataset.editData)

  switch (editType) {
    case "machine":
      const machine = machinesData.find((m) => m.id == editData.machineId)
      machine.name = document.getElementById("edit-name").value
      machine.status = document.getElementById("edit-status").value
      machine.description = document.getElementById("edit-description").value
      machine.target = Number.parseInt(document.getElementById("edit-target").value)
      break

    case "metric":
      const metricMachine = machinesData.find((m) => m.id == editData.machineId)
      const value = document.getElementById("edit-metric-value").value
      metricMachine[editData.metric] = editData.metric === "vibration" ? value : Number.parseFloat(value)
      break

    case "specs":
      const specsMachine = machinesData.find((m) => m.id == editData.machineId)
      specsMachine.specifications.power = document.getElementById("edit-power").value
      specsMachine.specifications.speed = document.getElementById("edit-speed").value
      specsMachine.specifications.capacity = document.getElementById("edit-capacity").value
      break
  }

  // Salvar no localStorage
  localStorage.setItem("machinesData", JSON.stringify(machinesData))

  // Atualizar interface
  updateAllComponents()

  // Fechar modal
  modal.classList.remove("active")

  showAlert("success", "Alteração Salva", "Os dados foram atualizados com sucesso")
}

// Função para inicializar eventos de edição
function initializeEditEvents() {
  // Eventos para botões de edição
  document.addEventListener("click", (e) => {
    if (e.target.closest(".edit-btn") && editMode) {
      const btn = e.target.closest(".edit-btn")
      const editType = btn.dataset.editType

      const data = {
        machineId: btn.dataset.machineId,
        metric: btn.dataset.metric,
      }

      openEditModal(editType, data)
    }
  })

  // Eventos do modal
  document.getElementById("modalClose").addEventListener("click", () => {
    document.getElementById("editModal").classList.remove("active")
  })

  document.getElementById("modalCancel").addEventListener("click", () => {
    document.getElementById("editModal").classList.remove("active")
  })

  document.getElementById("modalSave").addEventListener("click", saveEdit)

  // Fechar modal ao clicar fora
  document.getElementById("editModal").addEventListener("click", (e) => {
    if (e.target.id === "editModal") {
      document.getElementById("editModal").classList.remove("active")
    }
  })
}

// Função para inicializar configurações
function initializeSettings() {
  // Carregar configurações salvas
  const savedSettings = localStorage.getItem("systemSettings")
  if (savedSettings) {
    systemSettings = { ...systemSettings, ...JSON.parse(savedSettings) }
  }

  // Preencher campos de configuração
  document.getElementById("displayName").value = currentUser.name
  document.getElementById("userRole").value = currentUser.role
  document.getElementById("criticalTemp").value = systemSettings.criticalTemp
  document.getElementById("minEfficiency").value = systemSettings.minEfficiency
  document.getElementById("soundAlerts").checked = systemSettings.soundAlerts
  document.getElementById("autoUpdate").checked = systemSettings.autoUpdate

  // Renderizar configurações das máquinas
  renderMachineSettings()

  // Eventos para campos de máquinas
  document.addEventListener("change", (e) => {
    if (e.target.classList.contains("machine-field")) {
      const machineId = Number.parseInt(e.target.dataset.machineId)
      const field = e.target.dataset.field
      const value = e.target.value

      const machine = machinesData.find((m) => m.id === machineId)
      if (machine) {
        if (field === "power" || field === "speed" || field === "capacity") {
          machine.specifications[field] = value
        } else if (field === "target") {
          machine[field] = Number.parseInt(value)
        } else {
          machine[field] = value
        }

        // Salvar automaticamente
        localStorage.setItem("machinesData", JSON.stringify(machinesData))
        updateAllComponents()
      }
    }
  })

  // Salvar configurações
  document.getElementById("saveSettings").addEventListener("click", () => {
    // Atualizar configurações do usuário
    currentUser.name = document.getElementById("displayName").value
    currentUser.role = document.getElementById("userRole").value

    // Atualizar configurações do sistema
    systemSettings.criticalTemp = Number.parseInt(document.getElementById("criticalTemp").value)
    systemSettings.minEfficiency = Number.parseInt(document.getElementById("minEfficiency").value)
    systemSettings.soundAlerts = document.getElementById("soundAlerts").checked
    systemSettings.autoUpdate = document.getElementById("autoUpdate").checked

    // Salvar no localStorage
    localStorage.setItem("systemSettings", JSON.stringify(systemSettings))
    localStorage.setItem(
      "currentUser",
      JSON.stringify({
        username: currentUser.name,
        role: currentUser.role,
        loginTime: new Date().toISOString(),
      }),
    )

    // Atualizar interface
    loadUserData()
    updateAllComponents()

    showAlert("success", "Configurações Salvas", "Todas as alterações foram salvas com sucesso")
  })

  // Restaurar padrões
  document.getElementById("resetSettings").addEventListener("click", () => {
    if (confirm("Tem certeza que deseja restaurar as configurações padrão?")) {
      // Limpar localStorage
      localStorage.removeItem("systemSettings")
      localStorage.removeItem("machinesData")

      // Recarregar página
      location.reload()
    }
  })
}

// Função para atualizar todos os componentes
function updateAllComponents() {
  updateKPIs()
  renderMachines()
  renderMachineDetails()
  renderTemperatureSensors()
  renderVibrationSensors()
  renderAlerts()
  renderEfficiencyChart()
  renderProductionChart()
  renderMachineSettings()
}

// Função para simular dados em tempo real
function simulateRealTimeData() {
  if (!systemSettings.autoUpdate) return

  setInterval(() => {
    machinesData.forEach((machine) => {
      if (machine.status === "operational") {
        // Simula pequenas variações na eficiência
        const variation = (Math.random() - 0.5) * 4
        machine.efficiency = Math.max(70, Math.min(100, machine.efficiency + variation))
        machine.efficiency = Math.round(machine.efficiency)

        // Simula variações na produção
        const prodVariation = Math.floor((Math.random() - 0.5) * 20)
        machine.production = Math.max(0, machine.production + prodVariation)

        // Simula variações na temperatura
        const tempVariation = (Math.random() - 0.5) * 2
        machine.temperature = Math.max(20, Math.min(80, machine.temperature + tempVariation))
        machine.temperature = Math.round(machine.temperature)
      }
    })

    // Salvar alterações
    localStorage.setItem("machinesData", JSON.stringify(machinesData))

    // Atualizar interface
    updateAllComponents()
  }, 5000)
}

// Função para gerenciar o botão de menu
function initializeMenuButton() {
  const menuBtn = document.getElementById("menuBtn")
  let clickCount = 0

  menuBtn.addEventListener("click", () => {
    clickCount++

    menuBtn.classList.remove("active", "clicked")

    if (clickCount === 1) {
      menuBtn.classList.add("active")
    } else if (clickCount === 2) {
      menuBtn.classList.add("clicked")
    } else {
      clickCount = 0
    }

    setTimeout(() => {
      if (clickCount === 2) {
        showAlert("info", "Configurações", "Acesse o menu lateral para configurações avançadas!")
      }
    }, 500)
  })
}

// Função para mostrar alertas
function showAlert(type, title, message, duration = 5000) {
  let alertContainer = document.getElementById("alertContainer")
  if (!alertContainer) {
    alertContainer = document.createElement("div")
    alertContainer.id = "alertContainer"
    alertContainer.className = "alert-container"
    alertContainer.style.cssText = `
            position: fixed;
            top: 2rem;
            right: 2rem;
            z-index: 1000;
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
        `
    document.body.appendChild(alertContainer)
  }

  const alertId = "alert-" + Date.now()
  const alertElement = document.createElement("div")
  alertElement.className = `alert ${type}`
  alertElement.id = alertId
  alertElement.style.cssText = `
        background: white;
        border-radius: 0.5rem;
        padding: 1rem 1.5rem;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
        display: flex;
        align-items: center;
        gap: 0.75rem;
        min-width: 300px;
        animation: slideInAlert 0.3s ease-out;
        border-left: 4px solid;
    `

  let icon = "fas fa-info-circle"
  let borderColor = "#3b82f6"
  if (type === "success") {
    icon = "fas fa-check-circle"
    borderColor = "#10b981"
  }
  if (type === "error") {
    icon = "fas fa-exclamation-circle"
    borderColor = "#ef4444"
  }
  if (type === "warning") {
    icon = "fas fa-exclamation-triangle"
    borderColor = "#f59e0b"
  }

  alertElement.style.borderLeftColor = borderColor

  alertElement.innerHTML = `
        <i class="${icon}" style="font-size: 1.25rem; color: ${borderColor};"></i>
        <div style="flex: 1;">
            <div style="font-weight: 600; margin-bottom: 0.25rem; color: #1e293b;">${title}</div>
            <div style="font-size: 0.875rem; color: #64748b;">${message}</div>
        </div>
    `

  alertContainer.appendChild(alertElement)

  setTimeout(() => {
    alertElement.style.animation = "slideInAlert 0.3s ease-out reverse"
    setTimeout(() => {
      if (alertElement.parentNode) {
        alertElement.parentNode.removeChild(alertElement)
      }
    }, 300)
  }, duration)
}

// Inicialização
document.addEventListener("DOMContentLoaded", () => {
  // Carregar dados salvos
  const savedMachines = localStorage.getItem("machinesData")
  if (savedMachines) {
    machinesData = JSON.parse(savedMachines)
  }

  // Inicializar componentes
  loadUserData()
  updateDateTime()
  setInterval(updateDateTime, 1000)

  updateAllComponents()
  initializeTabs()
  initializeNavigation()
  initializeSidebar()
  initializeEditMode()
  initializeEditEvents()
  initializeSettings()
  initializeMenuButton()

  // Iniciar simulação de dados
  simulateRealTimeData()

  // Mensagem de boas-vindas
  setTimeout(() => {
    showAlert("info", "Sistema I-PAIN", `Bem-vindo, ${currentUser.name}! Sistema carregado com sucesso.`)
  }, 1000)
})
