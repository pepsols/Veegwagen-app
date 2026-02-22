import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import styles from './SavedRoutes.module.css';
export default function SavedRoutes({ onRouteSelect }) {
    const [routes, setRoutes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showPanel, setShowPanel] = useState(false);
    useEffect(() => {
        loadRoutes();
    }, []);
    const loadRoutes = async () => {
        try {
            setLoading(true);
            const { data, error: err } = await supabase
                .from('routes')
                .select('*')
                .order('created_at', { ascending: false });
            if (err)
                throw err;
            setRoutes(data || []);
            setError(null);
        }
        catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to load routes');
        }
        finally {
            setLoading(false);
        }
    };
    const handleDelete = async (id) => {
        try {
            const { error: err } = await supabase.from('routes').delete().eq('id', id);
            if (err)
                throw err;
            setRoutes(routes.filter(r => r.id !== id));
        }
        catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to delete route');
        }
    };
    const formatDistance = (meters) => {
        if (meters >= 1000) {
            return `${(meters / 1000).toFixed(2)} km`;
        }
        return `${Math.round(meters)} m`;
    };
    const formatDate = (dateStr) => {
        return new Date(dateStr).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };
    return (_jsxs("div", { className: styles.container, children: [_jsx("button", { className: styles.toggleBtn, onClick: () => setShowPanel(!showPanel), title: "View saved routes", children: "\uD83D\uDCCB" }), showPanel && (_jsxs("div", { className: styles.panel, children: [_jsxs("div", { className: styles.header, children: [_jsx("h2", { children: "Saved Routes" }), _jsx("button", { className: styles.closeBtn, onClick: () => setShowPanel(false), children: "\u00D7" })] }), error && _jsx("div", { className: styles.error, children: error }), loading ? (_jsx("div", { className: styles.loading, children: "Loading routes..." })) : routes.length === 0 ? (_jsx("div", { className: styles.empty, children: "No saved routes yet" })) : (_jsx("div", { className: styles.list, children: routes.map(route => (_jsxs("div", { className: styles.routeCard, children: [_jsxs("div", { className: styles.routeInfo, children: [_jsx("h3", { children: route.name }), _jsxs("p", { className: styles.details, children: [formatDistance(route.distance), " \u2022 ", route.coordinates.length, " points"] }), _jsx("p", { className: styles.date, children: formatDate(route.created_at) })] }), _jsxs("div", { className: styles.actions, children: [_jsx("button", { className: styles.viewBtn, onClick: () => {
                                                onRouteSelect(route);
                                                setShowPanel(false);
                                            }, children: "View" }), _jsx("button", { className: styles.deleteBtn, onClick: () => handleDelete(route.id), children: "Delete" })] })] }, route.id))) }))] }))] }));
}
