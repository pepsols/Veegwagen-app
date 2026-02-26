import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from 'react';
import styles from './TrackingPanel.module.css';
export default function TrackingPanel({ isTracking, distance, duration, coordinateCount, onStart, onStop, onSave, onClear, onBack, mode, }) {
    const [saveModal, setSaveModal] = useState(false);
    const [routeName, setRouteName] = useState('');
    const handleSave = () => {
        if (routeName.trim()) {
            onSave(routeName);
            setRouteName('');
            setSaveModal(false);
        }
    };
    const formatTime = (seconds) => {
        const h = Math.floor(seconds / 3600);
        const m = Math.floor((seconds % 3600) / 60);
        const s = seconds % 60;
        return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
    };
    const formatDistance = (meters) => {
        if (meters >= 1000) {
            return `${(meters / 1000).toFixed(2)} km`;
        }
        return `${Math.round(meters)} m`;
    };
    const modeTitle = {
        record: 'Route opnemen',
        drive: 'Route rijden',
        navigate: 'Navigeer naar start',
    };
    return (_jsxs("div", { className: styles.panel, children: [_jsxs("div", { className: styles.header, children: [_jsx("button", { className: styles.backBtn, onClick: onBack, title: "Terug naar menu", children: _jsx("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", children: _jsx("path", { d: "M19 12H5M12 19l-7-7 7-7", strokeLinecap: "round", strokeLinejoin: "round" }) }) }), _jsxs("div", { children: [_jsx("h1", { children: "VeegRoute" }), _jsx("p", { className: styles.subtitle, children: modeTitle[mode] })] })] }), _jsxs("div", { className: styles.stats, children: [_jsxs("div", { className: styles.stat, children: [_jsx("span", { className: styles.label, children: "Distance" }), _jsx("span", { className: styles.value, children: formatDistance(distance) })] }), _jsxs("div", { className: styles.stat, children: [_jsx("span", { className: styles.label, children: "Duration" }), _jsx("span", { className: styles.value, children: formatTime(duration) })] }), _jsxs("div", { className: styles.stat, children: [_jsx("span", { className: styles.label, children: "Points" }), _jsx("span", { className: styles.value, children: coordinateCount })] })] }), _jsxs("div", { className: styles.controls, children: [!isTracking ? (_jsx("button", { className: styles.startBtn, onClick: onStart, children: "Start Tracking" })) : (_jsx("button", { className: styles.stopBtn, onClick: onStop, children: "Stop Tracking" })), coordinateCount > 0 && (_jsxs(_Fragment, { children: [_jsx("button", { className: styles.saveBtn, onClick: () => setSaveModal(true), disabled: isTracking, children: "Save Route" }), _jsx("button", { className: styles.clearBtn, onClick: onClear, disabled: isTracking, children: "Clear" })] }))] }), saveModal && (_jsx("div", { className: styles.modal, children: _jsxs("div", { className: styles.modalContent, children: [_jsx("h2", { children: "Save Route" }), _jsx("input", { type: "text", placeholder: "Enter route name", value: routeName, onChange: (e) => setRouteName(e.target.value), onKeyPress: (e) => e.key === 'Enter' && handleSave(), autoFocus: true }), _jsxs("div", { className: styles.modalActions, children: [_jsx("button", { onClick: handleSave, className: styles.confirmBtn, children: "Save" }), _jsx("button", { onClick: () => setSaveModal(false), className: styles.cancelBtn, children: "Cancel" })] })] }) }))] }));
}
