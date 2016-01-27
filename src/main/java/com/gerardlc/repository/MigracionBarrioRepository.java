package com.gerardlc.repository;

import com.gerardlc.domain.MigracionBarrio;

import org.springframework.data.jpa.repository.*;

import java.util.ArrayList;
import java.util.List;

/**
 * Spring Data JPA repository for the MigracionBarrio entity.
 */
public interface MigracionBarrioRepository extends JpaRepository<MigracionBarrio,Long> {

    //SELECT sum(`numero_personas`),`barrio_destino_id` FROM `migracion_barrio` GROUP BY `barrio_destino_id`


    @Query("SELECT sum(m.numeroPersonas),m.barrioDestino from MigracionBarrio m group by m.barrioDestino")
    List<MigracionBarrio> findAllMigrationsbyBarrioDes();

}
