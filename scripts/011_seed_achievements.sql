-- Séverino El - Seed des achievements
-- Script 011: Badges et défis par défaut

-- Achievements de pratique
INSERT INTO achievements (name, description, icon_url, category, condition_type, condition_value, xp_reward, coins_reward, rarity) VALUES
('Premier pas', 'Complétez votre première session de pratique', '/badges/first-step.png', 'practice', 'practice_sessions', 1, 50, 10, 'common'),
('Pratiquant assidu', 'Pratiquez pendant 10 heures au total', '/badges/dedicated.png', 'practice', 'practice_time', 600, 200, 50, 'common'),
('Maître du rythme', 'Obtenez 95% de précision rythmique', '/badges/rhythm-master.png', 'practice', 'rhythm_accuracy', 95, 300, 75, 'rare'),
('Semaine parfaite', 'Pratiquez 7 jours consécutifs', '/badges/perfect-week.png', 'practice', 'streak', 7, 150, 30, 'common'),
('Mois de fer', 'Pratiquez 30 jours consécutifs', '/badges/iron-month.png', 'practice', 'streak', 30, 500, 100, 'epic'),
('Année de feu', 'Pratiquez 365 jours consécutifs', '/badges/fire-year.png', 'practice', 'streak', 365, 2000, 500, 'legendary'),

-- Achievements sociaux
('Premier ami', 'Suivez votre premier musicien', '/badges/first-friend.png', 'social', 'following', 1, 25, 5, 'common'),
('Influenceur', 'Atteignez 100 abonnés', '/badges/influencer.png', 'social', 'followers', 100, 300, 50, 'rare'),
('Star montante', 'Atteignez 1000 abonnés', '/badges/rising-star.png', 'social', 'followers', 1000, 1000, 200, 'epic'),
('Première publication', 'Publiez votre premier contenu', '/badges/first-post.png', 'social', 'posts', 1, 50, 10, 'common'),
('Créateur prolifique', 'Publiez 100 contenus', '/badges/prolific.png', 'social', 'posts', 100, 500, 100, 'rare'),

-- Achievements d'apprentissage
('Élève modèle', 'Terminez votre premier cours', '/badges/model-student.png', 'learning', 'courses_completed', 1, 100, 25, 'common'),
('Diplômé', 'Terminez 10 cours', '/badges/graduate.png', 'learning', 'courses_completed', 10, 500, 100, 'rare'),
('Érudit musical', 'Terminez 50 cours', '/badges/scholar.png', 'learning', 'courses_completed', 50, 1500, 300, 'epic'),
('Théoricien', 'Complétez tous les cours de théorie', '/badges/theorist.png', 'learning', 'theory_complete', 1, 750, 150, 'rare'),

-- Achievements communautaires
('Collaborateur', 'Participez à votre première jam session', '/badges/collaborator.png', 'community', 'jam_sessions', 1, 75, 15, 'common'),
('Jammeur pro', 'Participez à 50 jam sessions', '/badges/pro-jammer.png', 'community', 'jam_sessions', 50, 400, 75, 'rare'),
('Streamer', 'Faites votre premier live', '/badges/streamer.png', 'community', 'live_streams', 1, 100, 20, 'common'),
('Contributeur', 'Contribuez 10 corrections d''accords', '/badges/contributor.png', 'community', 'chord_contributions', 10, 200, 40, 'common'),

-- Achievements spéciaux
('Fondateur', 'Membre depuis le lancement de Séverino El', '/badges/founder.png', 'special', 'founder', 1, 1000, 500, 'legendary'),
('Bêta testeur', 'A participé à la phase de test', '/badges/beta-tester.png', 'special', 'beta', 1, 500, 200, 'epic'),
('Premium', 'Passez à l''abonnement Premium', '/badges/premium.png', 'special', 'subscription', 1, 100, 0, 'rare');

-- Défis quotidiens initiaux
INSERT INTO daily_challenges (title, description, challenge_type, target_value, xp_reward, coins_reward, valid_date) VALUES
('Échauffement matinal', 'Pratiquez pendant au moins 15 minutes', 'practice', 15, 50, 10, CURRENT_DATE),
('Partagez votre musique', 'Publiez un post ou un reel musical', 'post', 1, 30, 5, CURRENT_DATE),
('Apprenez quelque chose', 'Regardez au moins une leçon de cours', 'learn', 1, 40, 8, CURRENT_DATE),
('Connectez-vous', 'Suivez 3 nouveaux musiciens', 'social', 3, 25, 5, CURRENT_DATE);
