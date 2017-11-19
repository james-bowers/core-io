import { h } from 'preact';

export default ({ title, subject, children }) => {
    return (
        <div class="empty">
            <div class="empty-icon">
                <i class="icon icon-people"></i>
            </div>
            <p class="empty-title h5">{title}</p>
            <p class="empty-subtitle">{subject}</p>
            <div class="empty-action">
                {children}
            </div>
        </div>
    )
}
