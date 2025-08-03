<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>I-PAIN - Dashboard Industrial</title>
    <link rel="stylesheet" href="style.css">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
</head>
<body>
    <!-- Sidebar Menu -->
    <div class="sidebar" id="sidebar">
        <div class="sidebar-header">
            <div class="sidebar-logo">
                <i class="fas fa-industry"></i>
                <span>I-PAIN</span>
            </div>
            <button class="sidebar-toggle" id="sidebar-toggle">
                <i class="fas fa-bars"></i>
            </button>
        </div>
        
        <nav class="sidebar-nav">
            <div class="nav-section">
                <h4 class="nav-title">Dashboard</h4>
                <a href="#" class="nav-item active" data-page="dashboard">
                    <i class="fas fa-tachometer-alt"></i>
                    <span>Visão Geral</span>
                </a>
            </div>
            
            <div class="nav-section">
                <h4 class="nav-title">Máquinas</h4>
                <a href="#" class="nav-item" data-page="machine-1">
                    <i class="fas fa-cog"></i>
                    <span>Linha de Produção A</span>
                    <div class="status-indicator operational"></div>
                </a>
                <a href="#" class="nav-item" data-page="machine-2">
                    <i class="fas fa-cog"></i>
                    <span>Linha de Produção B</span>
                    <div class="status-indicator warning"></div>
                </a>
                <a href="#" class="nav-item" data-page="machine-3">
                    <i class="fas fa-cog"></i>
                    <span>Linha de Produção C</span>
                    <div class="status-indicator operational"></div>
                </a>
                <a href="#" class="nav-item" data-page="machine-4">
                    <i class="fas fa-cog"></i>
                    <span>Linha de Produção D</span>
                    <div class="status-indicator maintenance"></div>
                </a>
            </div>

            <div class="nav-section">
                <h4 class="nav-title">Documentação</h4>
                <a href="#" class="nav-item" data-page="technical-sheet">
                    <i class="fas fa-file-alt"></i>
                    <span>Ficha Técnica</span>
                </a>
            </div>

            <div class="nav-section">
                <h4 class="nav-title">Configurações</h4>
                <a href="#" class="nav-item" data-page="settings">
                    <i class="fas fa-cogs"></i>
                    <span>Configurações</span>
                </a>
            </div>
        </nav>
    </div>

    <!-- Main Content -->
    <div class="main-wrapper">
        <!-- Header -->
        <header class="header">
            <div class="header-content">
                <div class="logo-section">
                    <img src="/placeholder.svg?height=32&width=32" alt="I-PAIN Logo" class="logo-image">
                    <div class="logo-text">
                        <h1>I-PAIN</h1>
                        <p>Sistema de Monitoramento Industrial</p>
                    </div>
                </div>
                <div class="header-info">
                    <div class="user-info">
                        <div class="user-details">
                            <span class="user-name" id="currentUserName">Usuário</span>
                            <span class="user-role" id="currentUserRole">Função</span>
                        </div>
                        <div class="user-avatar">
                            <i class="fas fa-user"></i>
                        </div>
                    </div>
                    <div class="datetime">
                        <div id="current-date"></div>
                        <div id="current-time"></div>
                    </div>
                    <button class="edit-mode-btn" id="editModeBtn">
                        <i class="fas fa-edit"></i>
                        <span>Modo Edição</span>
                    </button>
                    <button class="menu-btn" id="menuBtn">
                        <i class="fas fa-bars"></i>
                        <i class="fas fa-times"></i>
                        <i class="fas fa-cog"></i>
                    </button>
                </div>
            </div>
        </header>

        <main class="main-content">
            <!-- Dashboard Page -->
            <div class="page active" id="dashboard-page">
                <!-- KPIs Overview -->
                <section class="kpis-section">
                    <div class="kpi-card" data-editable="kpi">
                        <div class="kpi-header">
                            <span class="kpi-title">Produção Total</span>
                            <i class="fas fa-chart-line kpi-icon"></i>
                            <button class="edit-btn" data-edit-type="kpi" data-kpi="production">
                                <i class="fas fa-edit"></i>
                            </button>
                        </div>
                        <div class="kpi-value" id="total-production">0</div>
                        <div class="kpi-subtitle">unidades hoje</div>
                    </div>

                    <div class="kpi-card" data-editable="kpi">
                        <div class="kpi-header">
                            <span class="kpi-title">Eficiência Média</span>
                            <i class="fas fa-tachometer-alt kpi-icon"></i>
                            <button class="edit-btn" data-edit-type="kpi" data-kpi="efficiency">
                                <i class="fas fa-edit"></i>
                            </button>
                        </div>
                        <div class="kpi-value" id="average-efficiency">0%</div>
                        <div class="kpi-subtitle">das 4 máquinas</div>
                    </div>

                    <div class="kpi-card" data-editable="kpi">
                        <div class="kpi-header">
                            <span class="kpi-title">Máquinas Ativas</span>
                            <i class="fas fa-power-off kpi-icon"></i>
                            <button class="edit-btn" data-edit-type="kpi" data-kpi="active">
                                <i class="fas fa-edit"></i>
                            </button>
                        </div>
                        <div class="kpi-value" id="active-machines">0/4</div>
                        <div class="kpi-subtitle">em operação</div>
                    </div>

                    <div class="kpi-card" data-editable="kpi">
                        <div class="kpi-header">
                            <span class="kpi-title">Status Geral</span>
                            <i class="fas fa-heartbeat kpi-icon"></i>
                            <button class="edit-btn" data-edit-type="kpi" data-kpi="status">
                                <i class="fas fa-edit"></i>
                            </button>
                        </div>
                        <div class="kpi-value status-normal">
                            <i class="fas fa-check-circle"></i>
                            Normal
                        </div>
                        <div class="kpi-subtitle">sistema operacional</div>
                    </div>
                </section>

                <!-- Tabs Navigation -->
                <div class="tabs-container">
                    <div class="tabs-nav">
                        <button class="tab-btn active" data-tab="machines">
                            <i class="fas fa-cogs"></i>
                            Máquinas
                        </button>
                        <button class="tab-btn" data-tab="sensors">
                            <i class="fas fa-satellite-dish"></i>
                            Sensores
                        </button>
                        <button class="tab-btn" data-tab="analytics">
                            <i class="fas fa-chart-bar"></i>
                            Análises
                        </button>
                    </div>

                    <!-- Machines Tab -->
                    <div class="tab-content active" id="machines-tab">
                        <div class="machines-grid" id="machines-container">
                            <!-- Máquinas serão inseridas aqui via JavaScript -->
                        </div>
                    </div>

                    <!-- Sensors Tab -->
                    <div class="tab-content" id="sensors-tab">
                        <div class="sensors-grid">
                            <div class="sensor-card">
                                <div class="sensor-header">
                                    <i class="fas fa-thermometer-half sensor-icon temperature"></i>
                                    <h3>Sensores de Temperatura</h3>
                                </div>
                                <div class="sensor-list" id="temperature-sensors">
                                    <!-- Sensores de temperatura -->
                                </div>
                            </div>

                            <div class="sensor-card">
                                <div class="sensor-header">
                                    <i class="fas fa-wave-square sensor-icon vibration"></i>
                                    <h3>Sensores de Vibração</h3>
                                </div>
                                <div class="sensor-list" id="vibration-sensors">
                                    <!-- Sensores de vibração -->
                                </div>
                            </div>

                            <div class="sensor-card">
                                <div class="sensor-header">
                                    <i class="fas fa-exclamation-triangle sensor-icon alerts"></i>
                                    <h3>Alertas Ativos</h3>
                                </div>
                                <div class="alerts-list" id="active-alerts">
                                    <!-- Alertas ativos -->
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Analytics Tab -->
                    <div class="tab-content" id="analytics-tab">
                        <div class="analytics-grid">
                            <div class="analytics-card">
                                <div class="analytics-header">
                                    <h3>Eficiência por Máquina</h3>
                                    <p>Comparativo de performance das últimas 24h</p>
                                </div>
                                <div class="progress-list" id="efficiency-chart">
                                    <!-- Gráficos de eficiência -->
                                </div>
                            </div>

                            <div class="analytics-card">
                                <div class="analytics-header">
                                    <h3>Produção vs Meta</h3>
                                    <p>Acompanhamento de metas diárias</p>
                                </div>
                                <div class="progress-list" id="production-chart">
                                    <!-- Gráficos de produção -->
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Machine Detail Pages -->
            <div class="page" id="machine-1-page">
                <div class="machine-detail-container" id="machine-1-detail">
                    <!-- Conteúdo da máquina 1 será inserido aqui -->
                </div>
            </div>

            <div class="page" id="machine-2-page">
                <div class="machine-detail-container" id="machine-2-detail">
                    <!-- Conteúdo da máquina 2 será inserido aqui -->
                </div>
            </div>

            <div class="page" id="machine-3-page">
                <div class="machine-detail-container" id="machine-3-detail">
                    <!-- Conteúdo da máquina 3 será inserido aqui -->
                </div>
            </div>

            <div class="page" id="machine-4-page">
                <div class="machine-detail-container" id="machine-4-detail">
                    <!-- Conteúdo da máquina 4 será inserido aqui -->
                </div>
            </div>

            <!-- Settings Page -->
            <div class="page" id="settings-page">
                <div class="settings-container">
                    <div class="settings-header">
                        <div class="settings-title">
                            <i class="fas fa-cogs"></i>
                            <h1>Configurações do Sistema</h1>
                        </div>
                    </div>

                    <div class="settings-content">
                        <div class="settings-section">
                            <h2 class="section-title">
                                <i class="fas fa-industry"></i>
                                Configurações das Máquinas
                            </h2>
                            <div class="machines-settings" id="machines-settings">
                                <!-- Configurações das máquinas serão inseridas aqui -->
                            </div>
                        </div>

                        <div class="settings-section">
                            <h2 class="section-title">
                                <i class="fas fa-user-cog"></i>
                                Configurações do Usuário
                            </h2>
                            <div class="user-settings">
                                <div class="setting-item">
                                    <label>Nome de Exibição:</label>
                                    <input type="text" id="displayName" class="setting-input">
                                </div>
                                <div class="setting-item">
                                    <label>Função:</label>
                                    <select id="userRole" class="setting-select">
                                        <option value="Operador">Operador</option>
                                        <option value="Supervisor">Supervisor</option>
                                        <option value="Administrador">Administrador</option>
                                        <option value="Manutenção">Manutenção</option>
                                    </select>
                                </div>
                                <div class="setting-item">
                                    <label>Atualização Automática:</label>
                                    <input type="checkbox" id="autoUpdate" class="setting-checkbox">
                                    <span>Ativar atualizações automáticas</span>
                                </div>
                            </div>
                        </div>

                        <div class="settings-section">
                            <h2 class="section-title">
                                <i class="fas fa-bell"></i>
                                Configurações de Alertas
                            </h2>
                            <div class="alert-settings">
                                <div class="setting-item">
                                    <label>Temperatura Crítica (°C):</label>
                                    <input type="number" id="criticalTemp" class="setting-input" value="75">
                                </div>
                                <div class="setting-item">
                                    <label>Eficiência Mínima (%):</label>
                                    <input type="number" id="minEfficiency" class="setting-input" value="70">
                                </div>
                                <div class="setting-item">
                                    <label>Alertas Sonoros:</label>
                                    <input type="checkbox" id="soundAlerts" class="setting-checkbox">
                                    <span>Ativar alertas sonoros</span>
                                </div>
                            </div>
                        </div>

                        <div class="settings-actions">
                            <button class="save-btn" id="saveSettings">
                                <i class="fas fa-save"></i>
                                Salvar Configurações
                            </button>
                            <button class="reset-btn" id="resetSettings">
                                <i class="fas fa-undo"></i>
                                Restaurar Padrões
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Technical Sheet Page -->
            <div class="page" id="technical-sheet-page">
                <div class="technical-sheet-container">
                    <div class="technical-sheet-header">
                        <div class="sheet-title">
                            <i class="fas fa-file-alt"></i>
                            <h1>Ficha Técnica de Processo</h1>
                            <span class="product-name">Bobina Fundo Estrela</span>
                        </div>
                        <div class="sheet-actions">
                            <button class="action-btn edit-sheet-btn" id="editSheetBtn">
                                <i class="fas fa-edit"></i>
                                Editar Ficha
                            </button>
                            <button class="action-btn print-btn">
                                <i class="fas fa-print"></i>
                                Imprimir
                            </button>
                            <button class="action-btn export-btn">
                                <i class="fas fa-download"></i>
                                Exportar PDF
                            </button>
                        </div>
                    </div>

                    <div class="technical-sheet-content" id="technicalSheetContent">
                        <!-- Conteúdo da ficha técnica será inserido aqui -->
                    </div>
                </div>
            </div>
        </main>
    </div>

    <!-- Edit Modal -->
    <div class="modal-overlay" id="editModal">
        <div class="modal-content">
            <div class="modal-header">
                <h3 id="modalTitle">Editar Item</h3>
                <button class="modal-close" id="modalClose">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="modal-body" id="modalBody">
                <!-- Conteúdo do modal será inserido aqui -->
            </div>
            <div class="modal-footer">
                <button class="btn-secondary" id="modalCancel">Cancelar</button>
                <button class="btn-primary" id="modalSave">Salvar</button>
            </div>
        </div>
    </div>

    <script src="script.js"></script>
</body>
</html>
