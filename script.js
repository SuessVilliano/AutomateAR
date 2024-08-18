document.addEventListener("DOMContentLoaded", function() {
    // Theme Toggle
    const themeToggle = document.querySelector('.theme-toggle');
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-theme');
        themeToggle.textContent = document.body.classList.contains('dark-theme') ? '🌙' : '🌞';
    });

    // Sidebar Toggle
    const sidebar = document.querySelector('.sidebar');
    const toggleBtn = document.createElement('div');
    toggleBtn.classList.add('toggle-btn');
    toggleBtn.innerHTML = '&#9776;'; // Hamburger icon
    sidebar.insertBefore(toggleBtn, sidebar.firstChild);
    
    toggleBtn.addEventListener('click', () => {
        sidebar.classList.toggle('collapsed');
    });

    // Simulate Sidebar Actions
    document.querySelectorAll('.sidebar ul li').forEach(item => {
        item.addEventListener('click', () => {
            alert(`This will navigate to ${item.textContent}`);
        });
    });

    // Babylon.js Setup for 3D Canvas
    const canvas = document.getElementById('threeDCanvas');
    const engine = new BABYLON.Engine(canvas, true);

    const createScene = function () {
        const scene = new BABYLON.Scene(engine);
        const camera = new BABYLON.ArcRotateCamera("camera1", Math.PI / 2, Math.PI / 4, 10, new BABYLON.Vector3(0, 0, 0), scene);
        camera.attachControl(canvas, true);

        const light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(1, 1, 0), scene);
        light.intensity = 0.7;

        // Multiple workflow nodes with different colors and icons
        const services = [
            { name: "Facebook", color: "#3b5998", position: new BABYLON.Vector3(-4, 0, 0), icon: "📘" },
            { name: "Twitter", color: "#1da1f2", position: new BABYLON.Vector3(0, 0, 0), icon: "🐦" },
            { name: "Instagram", color: "#e1306c", position: new BABYLON.Vector3(4, 0, 0), icon: "📷" },
            { name: "Webhook", color: "#32cd32", position: new BABYLON.Vector3(-2, -2, 0), icon: "🔗" },
            { name: "Email", color: "#ffa500", position: new BABYLON.Vector3(2, -2, 0), icon: "📧" }
        ];

        services.forEach(service => {
            const node = BABYLON.MeshBuilder.CreateBox(service.name, {size: 1}, scene);
            node.position = service.position;

            const dynamicTexture = new BABYLON.DynamicTexture("DynamicTexture", {width:512, height:512}, scene, false);
            dynamicTexture.drawText(`${service.icon} ${service.name}`, null, null, "bold 40px Arial", "white", "transparent", true);
            const mat = new BABYLON.StandardMaterial("mat", scene);
            mat.diffuseColor = BABYLON.Color3.FromHexString(service.color);
            mat.diffuseTexture = dynamicTexture;
            node.material = mat;

            // On-click event for opening a block's form
            node.actionManager = new BABYLON.ActionManager(scene);
            node.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger, function () {
                alert(`This is a ${service.name} block. Here, you can configure its settings.`);
            }));
        });

        // Connecting nodes with lines
        const points1 = [services[0].position, services[1].position];
        const lines1 = BABYLON.MeshBuilder.CreateLines("lines1", {points: points1}, scene);
        lines1.color = new BABYLON.Color3(1, 1, 1);

        const points2 = [services[1].position, services[2].position];
        const lines2 = BABYLON.MeshBuilder.CreateLines("lines2", {points: points2}, scene);
        lines2.color = new BABYLON.Color3(1, 1, 1);

        const points3 = [services[3].position, services[4].position];
        const lines3 = BABYLON.MeshBuilder.CreateLines("lines3", {points: points3}, scene);
        lines3.color = new BABYLON.Color3(1, 1, 1);

        return scene;
    };

    const scene = createScene();
    engine.runRenderLoop(function () {
        scene.render();
    });

    window.addEventListener("resize", function () {
        engine.resize();
    });

    // 2D/3D Toggle Functionality
    const viewToggle = document.querySelector('.view-toggle');
    let is2D = false;
    viewToggle.addEventListener('click', () => {
        is2D = !is2D;
        const workflowArea = document.querySelector('.workflow-area');
        if (is2D) {
            viewToggle.textContent = 'Switch to 3D';
            workflowArea.classList.add('grid'); // Add grid background
            services.forEach(service => {
                const node = scene.getMeshByName(service.name);
                node.rotation = BABYLON.Vector3.Zero(); // Reset rotation
                node.position.z = 0; // Flatten the z-axis
            });
        } else {
            viewToggle.textContent = 'Switch to 2D';
            workflowArea.classList.remove('grid'); // Remove grid background
            services.forEach(service => {
                const node = scene.getMeshByName(service.name);
                node.position = service.position; // Restore original position
            });
        }
    });

    // Block Resizing Slider
    const slider = document.querySelector('#block-size-slider');
    slider.addEventListener('input', (e) => {
        const scale = e.target.value / 100;
        services.forEach(service => {
            const node = scene.getMeshByName(service.name);
            node.scaling = new BABYLON.Vector3(scale, scale, scale);
        });
    });

    // Zoom buttons
    const zoomInBtn = document.querySelector('#zoom-in-btn');
    const zoomOutBtn = document.querySelector('#zoom-out-btn');

    zoomInBtn.addEventListener('click', () => {
        scene.activeCamera.radius -= 1;
    });

    zoomOutBtn.addEventListener('click', () => {
        scene.activeCamera.radius += 1;
    });

    // Builder Tools
    const addBlockBtn = document.querySelector('#add-block-btn');
    addBlockBtn.addEventListener('click', () => {
        alert('Add a new block functionality will be implemented here.');
    });

    const saveBtn = document.querySelector('#save-btn');
    saveBtn.addEventListener('click', () => {
        alert('Save workflow functionality will be implemented here.');
    });

    // Chat Bubble Functionality
    const chatBubble = document.querySelector('.chat-bubble');
    const chatBox = document.querySelector('.chat-box');
    chatBubble.addEventListener('click', () => {
        chatBox.style.display = chatBox.style.display === 'none' || chatBox.style.display === '' ? 'flex' : 'none';
    });

    // Settings page functionality
    const settingsPage = document.querySelector('.settings-page');
    if (settingsPage) {
        const themeColorInput = document.querySelector('#theme-color-input');
        themeColorInput.addEventListener('input', (e) => {
            document.documentElement.style.setProperty('--main-theme-color', e.target.value);
        });
    }
});
